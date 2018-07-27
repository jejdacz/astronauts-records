/***********************************
 * ExpressServer
 ***********************************/

import express from 'express';

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.static(__dirname + '/public'));

const schema = buildSchema(`
  type Query {
    astronaut(id: String!): Astronaut
    astronauts: [Astronaut]
  },
  type Mutation {
    updateAstronaut(id: String!, firstName: String!, lastName: String!, birth: String!, superPower: String!): Astronaut
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

const updateAstronaut = async function(args) {
  const { id, ...update } = args;
  let result;
  await Astronaut.findByIdAndUpdate(id, update, function (err, res){
    if (err) console.warn(`error ${err}`);
    result = res;
  });
  return result;
};

const getAstronaut = async function(args) {
  let result;
  await Astronaut.findById(args.id, function (err, res){
    if (err) console.warn(`error ${err}`);
    result = res;
  });
  return result;
};
/*
function resolveAfter10Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 10000);
  });
}*/

const getAstronauts = async function() {
  let result;
  await Astronaut.find(function (err, res){
    if (err) console.warn(`error ${err}`);
    result = res;
  });
  return result;
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

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

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

var Astronaut = mongoose.model('Astronaut', astronautSchema);

var armstrong = new Astronaut({ firstName: 'Neil', lastName: 'Armstrong', birth: '55.8.1930', superPower: 'healing' });

var gagarin = new Astronaut({ firstName: 'Jurij', lastName: 'Gagarin', birth: '9.3.1934', superPower: 'invisibility' });


/*
armstrong.save(function (err) {
    if (err) return console.error(err);
});*/
/*
gagarin.save(function (err) {
    if (err) return console.error(err);
});*/

//Kitten.find({}, {_id: 0, name:1}, function (err, res){console.log(res)});
