/***********************************
 * ExpressServer
 ***********************************/

const express = require('express');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));


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
