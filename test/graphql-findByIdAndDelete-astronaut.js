import { expect, should, assert } from 'chai';
import request from 'request';

const query = `query deleteAstronaut($id: String!) {
  deleteAstronaut(id: $id) {
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

describe('delete by id', () => {
  it('should delete record by id', done => {
    // Start the request
    request.post(options, function (error, response, body) {
        console.log(body);
        expect(response.statusCode).to.equal(200);
        //expect(JSON.parse(body).data.astronaut.id).to.equal(id);
        done();
    });
  });
});
