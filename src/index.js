import express from "express";
import path from "path";
import compression from "compression";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import { isValidName } from "input-validation";
import jsonwebtoken from "jsonwebtoken";
import jwt from "express-jwt";
import bodyParser from "body-parser";
import cors from "cors";

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
    me: User
  },
  type Mutation {
    updateAstronaut(id: String!, firstName: String!, lastName: String!, birth: String!, superpower: String!): Astronaut
    deleteAstronaut(id: String!): Astronaut
    addAstronaut(firstName: String!, lastName: String!, birth: String!, superpower: String!): Astronaut
    login(name: String!, password: String!): String
  },
  type Astronaut {
    id: String
    firstName: String
    lastName: String
    birth: String
    superpower: String
  }
  type User {
    id: String
    name: String
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

const getLastUpdated = (_, context) => {
  return lastUpdated;
};

/* SIMPLIFIED AUTHENTICATION */
const USER_ID = process.env.USER_ID;
const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.USER_PASSWORD;

const login = (args, context) => {
  return new Promise((resolve, reject) => {
    if (args.name === USER_NAME && args.password === USER_PASSWORD) {
      resolve(
        jsonwebtoken.sign(
          { id: USER_ID, name: USER_NAME },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y"
          }
        )
      );
    } else {
      context.next(new Error("Incorrect password"));
    }
  });
};

const me = (args, context) => {
  return new Promise((resolve, reject) => {
    if (context.user.id === USER_ID) {
      resolve({ id: USER_ID, name: USER_NAME });
    } else {
      context.next(new Error("You are not a valid user!"));
    }
  });
};

const auth = func => (args, context) => {
  return new Promise((resolve, reject) => {
    if (!context.user) {
      context.next(new Error("You are not authenticated!"));
    } else {
      resolve(func(args, context));
    }
  });
};

const root = {
  astronaut: auth(getAstronaut),
  astronauts: auth(getAstronauts),
  lastUpdated: auth(getLastUpdated),
  updateAstronaut: auth(updateAstronaut),
  deleteAstronaut: auth(deleteAstronaut),
  addAstronaut: auth(addAstronaut),
  login: login,
  me: auth(me)
};

const app = express();
app.use(cors());

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwtAuth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

app.use(jwtAuth);

app.use(express.static(path.resolve("client/build")));

app.use("/graphql", (req, res, next) => {
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV == "development",
    context: { next, user: req.user }
  })(req, res);
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve("client/build/index.html"))
);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.sendStatus(404);
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  } else if (err.status === 401) {
    res.sendStatus(401);
  } else {
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 5000, err =>
  err ? console.log(err) : console.log("Http server ready!")
);
