const graphqlRequest = (query, variables) =>
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("response error");
    }
  });

const fetchAll = () => {
  const query = `{ astronauts {id firstName lastName birth superPower} }`;
  return graphqlRequest(query).then(({ data }) => data.astronauts);
};

const fetchById = variables => {
  const query = `query astronaut($id: String!) {
    astronaut(id: $id) {
      id
      firstName
      lastName
      birth
      superPower
    }
  }`;
  return graphqlRequest(query, variables).then(({ data }) => data.astronaut);
};

const add = variables => {
  const query = `mutation addAstronaut($firstName: String!, $lastName: String!, $birth: String!, $superPower: String!) {
      addAstronaut(firstName: $firstName, lastName: $lastName, birth: $birth, superPower: $superPower) {
        id
        firstName
        lastName
        birth
        superPower
      }
    }`;
  return graphqlRequest(query, variables);
};

const updateById = variables => {
  const query = `mutation updateAstronaut($id: String!, $firstName: String!, $lastName: String!, $birth: String!, $superPower: String!) {
    updateAstronaut(id: $id, firstName: $firstName, lastName: $lastName, birth: $birth, superPower: $superPower) {
      id
      firstName
      lastName
      birth
      superPower
    }
  }`;
  return graphqlRequest(query, variables).then(({ data }) => data.astronaut);
};

const deleteById = variables => {
  const query = `mutation deleteAstronaut($id: String!) {
    deleteAstronaut(id: $id) {
      id
      firstName
      lastName
      birth
      superPower
    }
  }`;
  return graphqlRequest(query, variables).then(({ data }) => data.astronaut);
};

export default { fetchAll, fetchById, add, updateById, deleteById };
