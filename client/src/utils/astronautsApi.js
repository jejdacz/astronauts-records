import graphqlRequest from "./graphqlRequest.js";

const auth = sessionStorage.getItem("jwt");

const me = variables => {
  const query = `query me {me{name}}`;
  return graphqlRequest(query, variables, auth).then(({ data }) => data.me);
};

const logout = () => Promise.resolve(sessionStorage.setItem("jwt", null));

const login = variables => {
  const query = `mutation login($name: String!) {
    login(name: $name)
  }`;
  return graphqlRequest(query, variables).then(({ data }) => {
    sessionStorage.setItem("jwt", data.login);
    return data.login;
  });
};

const lastUpdated = variables => {
  const query = `{ lastUpdated }`;
  return graphqlRequest(query, variables, auth).then(({ data }) =>
    Number(data.lastUpdated)
  );
};

const astronauts = variables => {
  const query = `{ astronauts {id firstName lastName birth superpower} }`;
  return graphqlRequest(query, variables, auth).then(
    ({ data }) => data.astronauts
  );
};

const astronaut = variables => {
  const query = `query astronaut($id: String!) {
    astronaut(id: $id) {
      id
      firstName
      lastName
      birth
      superpower
    }
  }`;
  return graphqlRequest(query, variables, auth).then(
    ({ data }) => data.astronaut
  );
};

const addAstronaut = variables => {
  const query = `mutation addAstronaut($firstName: String!, $lastName: String!, $birth: String!, $superpower: String!) {
      addAstronaut(firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
        id
        firstName
        lastName
        birth
        superpower
      }
    }`;
  return graphqlRequest(query, variables, auth).then(
    ({ data }) => data.addAstronaut
  );
};

const updateAstronaut = variables => {
  const query = `mutation updateAstronaut($id: String!, $firstName: String!, $lastName: String!, $birth: String!, $superpower: String!) {
    updateAstronaut(id: $id, firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
      id
      firstName
      lastName
      birth
      superpower
    }
  }`;
  return graphqlRequest(query, variables, auth).then(
    ({ data }) => data.updateAstronaut
  );
};

const deleteAstronaut = variables => {
  const query = `mutation deleteAstronaut($id: String!) {
    deleteAstronaut(id: $id) {
      id
      firstName
      lastName
      birth
      superpower
    }
  }`;
  return graphqlRequest(query, variables, auth).then(
    ({ data }) => data.deleteAstronaut
  );
};

export default {
  astronauts,
  astronaut,
  addAstronaut,
  updateAstronaut,
  deleteAstronaut,
  lastUpdated,
  login,
  logout,
  me
};
