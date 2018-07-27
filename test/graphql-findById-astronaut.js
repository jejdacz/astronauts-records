//import http from 'http';
import { expect, should, assert } from 'chai';
import request from 'request';

const query = `query astronaut($id: String!) {
  astronaut(id: $id) {
    id
    firstName
    lastName
    birth
    superPower
  }
}`;
const id = "5b5a236352009d43ce72608a";

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
      variables: {id},
    })
};

describe('find by id', () => {
  it('should return record by id', done => {
    // Start the request
    request.post(options, function (error, response, body) {
        console.log(body);
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).data.astronaut.id).to.equal(id);
        done();
    });
  });
});
