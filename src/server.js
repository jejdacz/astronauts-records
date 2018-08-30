/***********************************
 * ExpressServer
 ***********************************/

import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import { isValidWord } from "input-validation";

//Set up default mongoose connection
const mongoDB = "mongodb://localhost:27017/evidence";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("MongoDB connected!");
});

const astronautSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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

const Astronaut = mongoose.model("Astronaut", astronautSchema);

const schema = buildSchema(`
  type Query {
    astronaut(id: String!): Astronaut
    astronauts: [Astronaut]
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

const updateAstronaut = args => {
  const { id, ...update } = args;
  return new Promise((resolve, reject) => {
    Astronaut.findById(id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        res.set({ update });
        res.save((err, res) => (err ? reject(err) : resolve(res)));
      }
    });
  });
};

const deleteAstronaut = args => {
  return new Promise((resolve, reject) => {
    Astronaut.findByIdAndDelete(args.id, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

const addAstronaut = args => {
  const astronaut = new Astronaut(args);
  return new Promise((resolve, reject) => {
    astronaut.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

const getAstronaut = args => {
  return new Promise((resolve, reject) => {
    Astronaut.findById(args.id, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

const getAstronauts = () => {
  return new Promise((resolve, reject) => {
    Astronaut.find((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

const root = {
  astronaut: getAstronaut,
  astronauts: getAstronauts,
  updateAstronaut: updateAstronaut,
  deleteAstronaut: deleteAstronaut,
  addAstronaut: addAstronaut
};

const app = express();

app.use(express.static(__dirname + "/client/build"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.get("*", (req, res) => res.sendFile(__dirname + "client/build/index.html"));

/*
app.get("/", (req, res) => {
  throw new Error("dd");
});
*/

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 5000, () => console.log("Http server ready!"));
