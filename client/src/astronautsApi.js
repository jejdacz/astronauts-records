import graphqlRequest from "./graphqlRequest.js";

const lastUpdated = () => {
  const query = `{ lastUpdated }`;
  return graphqlRequest(query).then(({ data }) => Number(data.lastUpdated));
};

const astronauts = () => {
  const query = `{ astronauts {id firstName lastName birth superpower} }`;
  return graphqlRequest(query).then(({ data }) => data.astronauts);
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
  return graphqlRequest(query, variables).then(({ data }) => data.astronaut);
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
  return graphqlRequest(query, variables);
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
  return graphqlRequest(query, variables).then(({ data }) => data.astronaut);
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
  return graphqlRequest(query, variables).then(({ data }) => data.astronaut);
};

export default {
  astronauts,
  astronaut,
  addAstronaut,
  updateAstronaut,
  deleteAstronaut,
  lastUpdated
};
