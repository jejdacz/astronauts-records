import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import { isValidName } from "input-validation";

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("MongoDB connected!");
});

const astronautSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: { validator: isValidName, message: "Invalid name" }
  },
  lastName: {
    type: String,
    required: true,
    validate: { validator: isValidName, message: "Invalid name" }
  },
  birth: {
    type: Date,
    get: v => new Date(v).toISOString().substr(0, 10),
    required: true
  },
  superpower: {
    type: String,
    required: true
  }
});

let lastUpdated = Date.now();

astronautSchema.post("save", () => (lastUpdated = Date.now()));
astronautSchema.post("remove", () => (lastUpdated = Date.now()));

const Astronaut = mongoose.model("Astronaut", astronautSchema);

// lastUpdated is set to type of String, beacause graphQL Int is only 32bit
const schema = buildSchema(`
  type Query {
    astronaut(id: String!): Astronaut
    astronauts: [Astronaut]
    lastUpdated: String
  },
  type Mutation {
    updateAstronaut(id: String!, firstName: String!, lastName: String!, birth: String!, superpower: String!): Astronaut
    deleteAstronaut(id: String!): Astronaut
    addAstronaut(firstName: String!, lastName: String!, birth: String!, superpower: String!): Astronaut
  },
  type Astronaut {
    id: String
    firstName: String
    lastName: String
    birth: String
    superpower: String
  }
`);

const updateAstronaut = (args, context) => {
  const { id, ...update } = args;
  return new Promise((resolve, reject) => {
    Astronaut.findById(id, (err, res) => {
      if (err) {
        context.next(err);
      } else {
        res.set(update);
        res.save((err, res) => (err ? context.next(err) : resolve(res)));
      }
    });
  });
};

const deleteAstronaut = (args, context) => {
  return new Promise((resolve, reject) => {
    Astronaut.findByIdAndDelete(args.id, (err, res) => {
      err ? context.next(err) : resolve(res);
    });
  });
};

const addAstronaut = (args, context) => {
  const astronaut = new Astronaut(args);
  return new Promise((resolve, reject) => {
    astronaut.save((err, res) => {
      err ? context.next(err) : resolve(res);
    });
  });
};

const getAstronaut = (args, context) => {
  return new Promise((resolve, reject) => {
    Astronaut.findById(args.id, (err, res) => {
      err ? context.next(err) : resolve(res);
    });
  });
};

const getAstronauts = (args, context) => {
  return new Promise((resolve, reject) => {
    Astronaut.find({}, null, { sort: "lastName" }, (err, res) => {
      err ? context.next(err) : resolve(res);
    });
  });
};

const getLastUpdated = () => {
  return lastUpdated;
};

const root = {
  astronaut: getAstronaut,
  astronauts: getAstronauts,
  lastUpdated: getLastUpdated,
  updateAstronaut: updateAstronaut,
  deleteAstronaut: deleteAstronaut,
  addAstronaut: addAstronaut
};

const app = express();

app.use(express.static(__dirname + "/../client/build"));

app.use("/graphql", (req, res, next) =>
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV == "development",
    context: { next }
  })(req, res)
);

app.get("*", (req, res) =>
  res.sendFile(__dirname + "/../client/build/index.html")
);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.sendStatus(404);
  } else if ((err.name = "ValidationError")) {
    res.status(400).json({ error: err.message });
  } else {
    res.sendStatus(500);
  }
});

app.listen(
  process.env.PORT || 5000,
  err => (err ? console.log(err) : console.log("Http server ready!"))
);
