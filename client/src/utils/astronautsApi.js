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

const createCall = query => postprocess => variables =>
  fetch(url, request(query, variables, auth))
    .then(checkResponse)
    .then(postprocess);

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
  astronauts: createCall(queryAstronauts)(({ data }) => data.astronauts),
  astronaut: createCall(queryAstronaut)(({ data }) => data.astronaut),
  addAstronaut: createCall(queryAddAstronaut)(({ data }) => data.addAstronaut),
  updateAstronaut: createCall(queryUpdateAstronaut)(
    ({ data }) => data.updateAstronaut
  ),
  deleteAstronaut: createCall(queryDeleteAstronaut)(
    ({ data }) => data.deleteAstronaut
  ),
  lastUpdated: createCall(queryLastUpdated)(({ data }) =>
    Number(data.lastUpdated)
  ),
  login: createCall(queryLogin)(login),
  logout,
  me: createCall(queryMe)(({ data }) => data.me)
};
