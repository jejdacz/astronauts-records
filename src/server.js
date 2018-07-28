/***********************************
 * ExpressServer
 ***********************************/

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/evidence';
mongoose.connect(mongoDB, {useNewUrlParser: true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
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
    required: true
  },
  superPower: {
    type: String,
    required: true
  },
});

const Astronaut = mongoose.model('Astronaut', astronautSchema);

const schema = buildSchema(`
  type Query {
    astronaut(id: String!): Astronaut
    astronauts: [Astronaut]
  },
  type Mutation {
    updateAstronaut(id: String!, firstName: String!, lastName: String!, birth: String!, superPower: String!): Astronaut
    deleteAstronaut(id: String!): Astronaut
    addAstronaut(firstName: String!, lastName: String!, birth: String!, superPower: String!): Astronaut
  },
  type Astronaut {
    id: String
    firstName: String
    lastName: String
    birth: String
    superPower: String
  }
`);

const updateAstronaut = (args) => {
  const { id, ...update } = args;
  return new Promise((resolve, reject) => {
                  Astronaut.findByIdAndUpdate(id, update, { new: true }, (err, res) => {
                      err ? reject(err) : resolve(res)
                  });
              });
};

const deleteAstronaut = (args) => {
  return new Promise((resolve, reject) => {
                  Astronaut.findByIdAndDelete(args.id, (err, res) => {
                      err ? reject(err) : resolve(res)
                  });
              });
};

const addAstronaut = (args) => {
  const astronaut = new Astronaut(args);

  return new Promise((resolve, reject) => {
                  astronaut.save((err, res) => {
                      err ? reject(err) : resolve(res)
                  });
              });
};


const getAstronaut = (args) => {
  return new Promise((resolve, reject) => {
                Astronaut.findById(args.id, (err, res) => {
                    err ? reject(err) : resolve(res)
                });
            });
};

const getAstronauts = () => {
  return new Promise((resolve, reject) => {
                Astronaut.find((err, res) => {
                    err ? reject(err) : resolve(res)
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

app.use(express.static(__dirname + '/public'));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(process.env.PORT || 8080, () => console.log('Http server ready!'));
