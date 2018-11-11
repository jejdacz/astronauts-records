import { expect, should, assert } from "chai";
import request from "request";

let baseRequest = request.defaults({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  url: "http://localhost:5000/graphql",
  method: "POST"
});

let id;

describe("GraphQL CREATE operation", () => {
  it("should add astronaut", done => {
    const variables = {
      firstName: "Neil",
      lastName: "Armstrong",
      birth: "1930-08-05",
      superpower: "healing"
    };

    const query = `mutation addAstronaut($firstName: String!, $lastName: String!, $birth: String!, $superpower: String!) {
      addAstronaut(firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
        id
        firstName
        lastName
        birth
        superpower
      }
    }`;

    const options = {
      body: JSON.stringify({
        query,
        variables
      })
    };

    baseRequest.post(options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).data.addAstronaut.firstName).to.equal(
        variables.firstName
      );
      id = JSON.parse(body).data.addAstronaut.id;
      done();
    });
  });
});

describe("GraphQL READ operation", () => {
  it("should read all astronauts", done => {
    const query = `{ astronauts {id firstName lastName birth superpower} }`;

    const options = {
      body: JSON.stringify({
        query
      })
    };

    baseRequest.post(options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).data.astronauts).to.not.equal("null");
      done();
    });
  });
});

describe("GraphQL READ by ID operation", () => {
  it("should read astronaut by id", done => {
    const query = `query astronaut($id: String!) {
      astronaut(id: $id) {
        id
        firstName
        lastName
        birth
        superpower
      }
    }`;

    const variables = { id };

    const options = {
      body: JSON.stringify({
        query,
        variables
      })
    };

    baseRequest.post(options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).data.astronaut.id).to.equal(id);
      done();
    });
  });
});

describe("GraphQL UPDATE operation", () => {
  it("should update astronaut", done => {
    const variables = {
      id,
      firstName: "Abraham",
      lastName: "Armstrong",
      birth: "1930-08-05",
      superpower: "healing"
    };

    const query = `mutation updateAstronaut($id: String!, $firstName: String!, $lastName: String!, $birth: String!, $superpower: String!) {
      updateAstronaut(id: $id, firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
        id
        firstName
        lastName
        birth
        superpower
      }
    }`;

    const options = {
      body: JSON.stringify({
        query,
        variables
      })
    };

    baseRequest.post(options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).data.updateAstronaut).to.deep.equal(variables);
      done();
    });
  });
});

describe("GraphQL DELETE operation", () => {
  it("should delete astronaut", done => {
    const variables = { id };

    const query = `mutation deleteAstronaut($id: String!) {
      deleteAstronaut(id: $id) {
        id
        firstName
        lastName
        birth
        superpower
      }
    }`;

    const options = {
      body: JSON.stringify({
        query,
        variables
      })
    };

    baseRequest.post(options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).data.deleteAstronaut.id).to.equal(id);
      done();
    });
  });
});
