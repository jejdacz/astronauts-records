import { expect, should, assert } from "chai";
import http from "http";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

describe("Server tests", () => {
  describe("Server connection test", () => {
    it("should return 200", done => {
      http.get("http://localhost:5000/", res => {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

  xdescribe("Server error 404 test", () => {
    it("should return 404", done => {
      http.get("http://localhost:5000/abc", res => {
        assert.equal(404, res.statusCode);
        done();
      });
    });
  });

  describe("Server default route test", () => {
    it("should return 200", done => {
      http.get("http://localhost:5000/abc", res => {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const url = "http://localhost:5000/graphql";
  const method = "POST";

  const defaults = {
    headers,
    url,
    method
  };

  const baseRequest = request.defaults(defaults);

  let jwt;

  describe("when login", () => {
    it("should return jwt on success", done => {
      const variables = {
        name: process.env.USER_NAME,
        password: process.env.USER_PASSWORD
      };

      const query = `mutation login($name: String!, $password: String!) {login(name: $name, password:$password)}`;

      const options = {
        body: JSON.stringify({
          query,
          variables
        })
      };

      baseRequest.post(options, function(error, response, body) {
        jwt = JSON.parse(body).data.login;
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).data.login).to.exist;
        done();
      });
    });
  });

  const auth = jwt => ({
    Authorization: `Bearer ${jwt}`
  });

  const authRequest = jwt =>
    request.defaults({
      headers: { ...headers, ...auth(jwt) },
      url,
      method
    });

  describe("GraphQL CRUD", () => {
    let id;

    describe("CREATE operation", () => {
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

        authRequest(jwt).post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).data.addAstronaut.firstName).to.equal(
            variables.firstName
          );
          id = JSON.parse(body).data.addAstronaut.id;
          done();
        });
      });
    });

    describe("READ operation", () => {
      it("should read all astronauts", done => {
        const query = `{ astronauts {id firstName lastName birth superpower} }`;

        const options = {
          body: JSON.stringify({
            query
          })
        };

        authRequest(jwt).post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).data.astronauts).to.not.equal("null");
          done();
        });
      });
    });

    describe("READ by ID operation", () => {
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

        authRequest(jwt).post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).data.astronaut.id).to.equal(id);
          done();
        });
      });
    });

    describe("UPDATE operation", () => {
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

        authRequest(jwt).post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).data.updateAstronaut).to.deep.equal(
            variables
          );
          done();
        });
      });
    });

    describe("DELETE operation", () => {
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

        authRequest(jwt).post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).data.deleteAstronaut.id).to.equal(id);
          done();
        });
      });
    });

    describe("when passing invalid data", () => {
      it("should response 400", done => {
        const variables = {
          firstName: "Neil",
          lastName: "Armstrong2",
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

        authRequest(jwt).post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(400);
          done();
        });
      });
    });

    describe("when perform Unauthorized request", () => {
      it("should return 401", () => {
        const options = {
          body: JSON.stringify({
            query: { query: "{lastUpdated}" }
          })
        };

        baseRequest.post(options, function(error, response, body) {
          expect(response.statusCode).to.equal(401);
          done();
        });
      });
    });
  });
});
