/***********************************
 * ExpressServer
 ***********************************/

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { Astronaut } from './db.js';

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

const updateAstronaut = (args) => {
  const { id, ...update } = args;
  return new Promise((resolve, reject) => {
                  Astronaut.findByIdAndUpdate(id, update, { new: true }, (err, res) => {
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
  updateAstronaut: updateAstronaut
};

/*
function resolveAfter10Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 10000);
  });
}*/

/*** routes ***/

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(process.env.PORT || 4000, () => console.log('Now browse to localhost:4000/graphql'));