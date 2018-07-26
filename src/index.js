/***********************************
 * ExpressServer
 ***********************************/

//const express = require('express');
import express from 'express';

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type Query {
    astronaut(id: Int!): Astronaut
    astronauts: [Astronaut]
  },
  type Mutation {
    updateAstronaut(id: Int!, firstName: String!, lastName: String!, birth: String!, superPower: String!): Astronaut
  },
  type Astronaut {
    id: String
    firstName: String
    lastName: String
    birth: String
    superPower: String
  }
`);

const data = [
  { id: 0, firstName: 'Neil', lastName: 'Armstrong', birth: '5.8.1930', superPower: 'healing' },
  { id: 1, firstName: 'Jurij', lastName: 'Gagarin', birth: '9.3.1934', superPower: 'invisibility' }
];

const updateAstronaut = function({id, firstName, lastName, birth, superPower}) {
  data.map(astronaut => {
    if (astronaut.id === id) {
      astronaut.firstName = firstName;
      astronaut.lastName = lastName;
      astronaut.birth = birth;
      astronaut.superPower = superPower;
      return astronaut;
    }
  });
  return data.filter(astronaut => {
    return astronaut.id === id;
  })[0];
};

const getAstronaut = function(args) {
  let id = args.id;
  return data.filter(astronaut => {
    return astronaut.id === id;
  })[0];
};

const getAstronauts = function() {
  return data;
};

const root = {
  astronaut: getAstronaut,
  astronauts: getAstronauts,
  updateAstronaut: updateAstronaut
};

/*** routes ***/

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(process.env.PORT || 4000, () => console.log('Now browse to localhost:4000/graphql'));


/***********************************
 * Mongoose
 ***********************************/

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/evidence';
mongoose.connect(mongoDB, {useNewUrlParser: true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("We're connected!");
});

var astronautSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birth: {
    type: Date,
    validate: {
      validator: function(v) {
        return !isNaN(Date.parse(v));
      },
      message: '{VALUE} is not a valid date!'
    }
  },
  superPower: String
});

var Astronaut = mongoose.model('Astronaut', astronautSchema);

var armstrong = new Astronaut({ firstName: 'Neil', lastName: 'Armstrong', birth: '5.8.1930', superPower: 'healing' });

var gagarin = new Astronaut({ firstName: 'Jurij', lastName: 'Gagarin', birth: '9.3.1934', superPower: 'invisibility' });

/*
fluffy.save(function (err) {
    if (err) return console.error(err);
});

silence.save(function (err) {
    if (err) return console.error(err);
});*/

//Kitten.find({}, {_id: 0, name:1}, function (err, res){console.log(res)});
