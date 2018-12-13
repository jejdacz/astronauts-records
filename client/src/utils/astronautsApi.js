import {
  mergeRight,
  mergeDeepRight,
  curry,
  compose,
  lensPath,
  lensProp,
  assoc,
  set,
  over
} from "ramda";

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

export const url = "http://localhost:5000/graphql";

export const requestBase = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

export const getAuth = () => `Bearer ${sessionStorage.getItem("jwt")}`;

const parseResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("response error");
  }
};

const then = curry((func, promise) => promise.then(func));

const fetchJSON = curry((url, request) => fetch(url, request));

export const authorizeRequest = getAuth => request => {
  const lensAuth = lensPath(["headers", "Authorization"]);
  return set(lensAuth, getAuth(), request);
};

export const requestBody = (query, variables) => ({
  body: JSON.stringify({ query, variables })
});

export const request = query => variables =>
  mergeRight(requestBase, requestBody(query, variables));

export const fetchApiData = (post = x => x) =>
  compose(
    then(post),
    then(parseResponse),
    fetchJSON(url)
  );

export const call = (query, post) =>
  compose(
    fetchApiData(post),
    request(query)
  );

export const callAuth = (query, post) =>
  compose(
    fetchApiData(post),
    authorizeRequest(getAuth),
    request(query)
  );

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
    ? callAuth(queryMe, then(({ data }) => data.me))
    : () => Promise.reject()
};
