const queryMe = `query me {me{name}}`;

const queryLogin = `mutation login($name: String!, $password: String!) {login(name: $name, password:$password)}`;

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

const url = "http://localhost:5000/graphql";

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
  fetch(url, request(query, variables, sessionStorage.getItem("jwt")))
    .then(checkResponse)
    .then(postprocess);

const loginCall = query => postprocess => variables =>
  fetch(url, request(query, variables))
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

const logout = () => Promise.resolve(sessionStorage.removeItem("jwt", null));

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
  me: sessionStorage.getItem("jwt")
    ? createCall(queryMe)(({ data }) => data.me)
    : () => Promise.reject()
};
