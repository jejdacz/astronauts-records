//import http from 'http';
import { expect, should, assert } from 'chai';
import request from 'request';

// Set the headers
var headers = {
    'Content-Type':     'application/json',
    'Accept':     'application/json'
};

// Configure the request
var options = {
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({query: "{ astronauts {firstName lastName} }"})
};

describe('Example graphQL Server', () => {
  it('should return data', done => {
    // Start the request
    request.post(options, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).data).to.have.property("astronauts");
        done();
    });
  });
});
