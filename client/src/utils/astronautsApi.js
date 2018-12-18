import { mergeRight, lensPath, set } from "ramda";

export const queryMe = `query me {me{name}}`;

export const queryLogin = `mutation login($name: String!, $password: String!) {login(name: $name, password:$password)}`;

export const queryLastUpdated = `{ lastUpdated }`;

export const queryAstronauts = `{ astronauts {id firstName lastName birth superpower} }`;

export const queryAstronaut = `query astronaut($id: String!) {
  astronaut(id: $id) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

export const queryAddAstronaut = `mutation addAstronaut($firstName: String!,
  $lastName: String!, $birth: String!, $superpower: String!) {
  addAstronaut(firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

export const queryUpdateAstronaut = `mutation updateAstronaut($id: String!, $firstName: String!, $lastName: String!, $birth: String!, $superpower: String!) {
  updateAstronaut(id: $id, firstName: $firstName, lastName: $lastName, birth: $birth, superpower: $superpower) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

export const queryDeleteAstronaut = `mutation deleteAstronaut($id: String!) {
  deleteAstronaut(id: $id) {
    id
    firstName
    lastName
    birth
    superpower
  }
}`;

export const authorizeRequest = (getAuthToken, request) => {
  const lensAuth = lensPath(["headers", "Authorization"]);
  return set(lensAuth, getAuthToken(), request);
};

export const requestBase = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

export const request = (query, variables) =>
  mergeRight(requestBase, {
    body: JSON.stringify({ query, variables })
  });

export const authRequest = (query, vars) =>
  authorizeRequest(getAuth, request(query, vars));

export const url = process.env.REACT_APP_API_URL || "/graphql";

export const parseResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("response error");
  }
};

export const fetchApi = url => request => fetch(url, request);

export const composeCall = (request, fetchUrl, parse) => (
  query,
  post = x => x
) => vars =>
  fetchUrl(request(query, vars))
    .then(parse)
    .then(post);

export const callBase = request =>
  composeCall(request, fetchApi(url), parseResponse);

export const call = callBase(request);
export const callAuth = callBase(authRequest);

export const getAuth = () => `Bearer ${sessionStorage.getItem("jwt")}`;

export const login = ({ data }) => {
  sessionStorage.setItem("jwt", data.login);
  return data.login;
};

export const logout = () =>
  Promise.resolve(sessionStorage.removeItem("jwt", null));

export default {
  astronauts: callAuth(queryAstronauts, ({ data }) => data.astronauts),
  astronaut: callAuth(queryAstronaut, ({ data }) => data.astronaut),
  addAstronaut: callAuth(queryAddAstronaut, ({ data }) => data.addAstronaut),
  updateAstronaut: callAuth(
    queryUpdateAstronaut,
    ({ data }) => data.updateAstronaut
  ),
  deleteAstronaut: callAuth(
    queryDeleteAstronaut,
    ({ data }) => data.deleteAstronaut
  ),
  lastUpdated: callAuth(queryLastUpdated, ({ data }) =>
    Number(data.lastUpdated)
  ),
  login: call(queryLogin, login),
  logout,
  me: sessionStorage.getItem("jwt")
    ? callAuth(queryMe, ({ data }) => data.me)
    : () => Promise.reject()
};
