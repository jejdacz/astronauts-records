/***********************************
 * Object model by Mongoose
 ***********************************/

//Import the mongoose module
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
  console.log("We're connected!");
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

var armstrong = new Astronaut({ firstName: 'Neil', lastName: 'Armstrong', birth: '55.8.1930', superPower: 'healing' });

var gagarin = new Astronaut({ firstName: 'Jurij', lastName: 'Gagarin', birth: '9.3.1934', superPower: 'invisibility' });

export { Astronaut };
