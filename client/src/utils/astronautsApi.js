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

export const url = "http://localhost:5000/graphql";

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

export const requestBase = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

const setProp = curry((prop, obj, val) => ({ ...obj, [prop]: val }));

export const requestBody = query => variables => ({
  body: JSON.stringify({ query, variables })
});

const getAuth = () => `Bearer ${sessionStorage.getItem("jwt")}`;

const checkResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("response error");
  }
};

const then = curry((func, promise) => promise.then(func));

const fetchJSON = curry((url, request) => fetch(url, request));

export const ApiFetch = (fetcher, getAuth) => {
  const lensPathAuth = lensPath(["headers", "Authorization"]);

  const call = compose(
    fetcher(url),
    mergeDeepRight(requestBase)
  );

  const base = query =>
    compose(
      call,
      requestBody(query)
    );

  const auth = query =>
    compose(
      call,
      set(lensPathAuth, getAuth()),
      requestBody(query)
    );

  return {
    base,
    auth
  };
};

const reqBasic = query => variables =>
  mergeDeepRight(requestBase, {
    body: JSON.stringify({ query, variables })
  });

const reqAuth = getAuth => query => variables =>
  mergeDeepRight(
    { headers: { Authorization: getAuth() } },
    reqBasic(query, variables)
  );

const composeFetch = request => query =>
  compose(
    then(checkResponse),
    fetchJSON(url),
    request(query)
  );

const fetchAuth = composeFetch(reqAuth(getAuth));
const fetchBasic = composeFetch(reqBasic);

const createCall = auth => query => postprocess => variables =>
  fetch(url, request(query, variables, auth && sessionStorage.getItem("jwt")))
    .then(checkResponse)
    .then(postprocess);

const authCall = createCall(true);
const baseCall = createCall();

const login = ({ data }) => {
  sessionStorage.setItem("jwt", data.login);
  return data.login;
};

const logout = () => Promise.resolve(sessionStorage.removeItem("jwt", null));

export default {
  astronauts: authCall(queryAstronauts)(({ data }) => data.astronauts),
  astronaut: authCall(queryAstronaut)(({ data }) => data.astronaut),
  addAstronaut: authCall(queryAddAstronaut)(({ data }) => data.addAstronaut),
  updateAstronaut: authCall(queryUpdateAstronaut)(
    ({ data }) => data.updateAstronaut
  ),
  deleteAstronaut: authCall(queryDeleteAstronaut)(
    ({ data }) => data.deleteAstronaut
  ),
  lastUpdated: authCall(queryLastUpdated)(({ data }) =>
    Number(data.lastUpdated)
  ),
  login: baseCall(queryLogin)(login),
  logout,
  me: sessionStorage.getItem("jwt")
    ? authCall(queryMe)(({ data }) => data.me)
    : () => Promise.reject()
};
