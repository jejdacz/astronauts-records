import { expect, should, assert } from 'chai';
import request from 'request';

const query = `mutation updateAstronaut($id: String!, $firstName: String!, $lastName: String!, $birth: String!, $superPower: String!) {
  updateAstronaut(id: $id, firstName: $firstName, lastName: $lastName, birth: $birth, superPower: $superPower) {
    id
    firstName
    lastName
    birth
    superPower
  }
}`;
const variables = {
  id : '5b5a236352009d43ce72608a',
  firstName : 'Neil',
  lastName : 'Armstrong',
  birth : '5.8.1930',
  superPower : 'healing'
};

// Set the headers
const headers = {
    'Content-Type':     'application/json',
    'Accept':     'application/json'
};

// Configure the request
const options = {
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query,
      variables: variables,
    })
};

describe('update', () => {
  it('should update and return record by id', done => {
    // Start the request
    request.post(options, function (error, response, body) {
        console.log(body);
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).data.updateAstronaut.id).to.equal(variables.id);
        done();
    });
  });
});
