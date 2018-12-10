const queryMe = `query me {me{name}}`;

const queryLogin = `mutation login($name: String!) {
  login(name: $name)
}`;

const queryLastUpdated = `{ lastUpdated }`;

const queryAstronauts = `{ astronauts {id firstName lastName birth superpower} }`;

const queryAstronaut = `query astronaut($id: String!) {
  astronaut(id: $id) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

const queryAddAstronaut = `mutation addAstronaut($firstName: String!,
  $lastName: String!, $birth: String!, $superpower: String!) {
  addAstronaut(firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

const queryUpdateAstronaut = `mutation updateAstronaut($id: String!, $firstName: String!, $lastName: String!, $birth: String!, $superpower: String!) {
  updateAstronaut(id: $id, firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

const queryDeleteAstronaut = `mutation deleteAstronaut($id: String!) {
  deleteAstronaut(id: $id) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

const url = "/graphql";

const auth = sessionStorage.getItem("jwt");

const request = (query, variables, auth) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(auth && {
      Authorization: `Bearer ${auth}`
    })
  },
  body: JSON.stringify({
    query,
    variables
  })
});

const createCall = query => variables =>
  fetch(url, request(query, variables, auth)).then(checkResponse);

const checkResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("response error");
  }
};

const login = ({ data }) => {
  sessionStorage.setItem("jwt", data.login);
  return data.login;
};

const logout = () => Promise.resolve(sessionStorage.setItem("jwt", null));

export default {
  astronauts: createCall(queryAstronauts).then(({ data }) => data.astronauts),
  astronaut: createCall(queryAstronaut).then(({ data }) => data.astronaut),
  addAstronaut: createCall(queryAddAstronaut).then(
    ({ data }) => data.addAstronaut
  ),
  updateAstronaut: createCall(queryUpdateAstronaut).then(
    ({ data }) => data.updateAstronaut
  ),
  deleteAstronaut: createCall(queryDeleteAstronaut).then(
    ({ data }) => data.deleteAstronaut
  ),
  lastUpdated: createCall(queryLastUpdated).then(({ data }) =>
    Number(data.lastUpdated)
  ),
  login: createCall(queryLogin).then(login),
  logout,
  me: createCall(queryMe).then(({ data }) => data.me)
};
