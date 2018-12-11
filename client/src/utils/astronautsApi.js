import {
  mergeRight,
  mergeDeepRight,
  curry,
  compose,
  lensPath,
  lensProp,
  assoc,
  set
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

const requestBase = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

const lensAuth = lensPath(["headers", "Authorization"]);
const lensBody = lensProp("body");
const lensQuery = lensProp("query");
const lensVars = lensProp("variables");

const setProp = curry((prop, obj, val) => ({ ...obj, [prop]: val }));

//set(lensAuth,getAuth)
/*login: compose(fetchBase,set(lensBody,JSON.stringify),mergeRight({query: queryLogin}),(val)=>({variables:val}));*/

const getAuth = () => `Bearer ${sessionStorage.getItem("jwt")}`;

const checkResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("response error");
  }
};

const fetchJSON = curry((url, request) => fetch(url, request));

const fetchBase = compose(
  f => f.then(checkResponse),
  fetchJSON(url),
  mergeDeepRight({ requestBase })
);

const fetchAuth = compose(
  fetchBase,
  set(lensAuth, getAuth())
);

export const buildBody2 = query => variables => ({
  body: JSON.stringify({ query, variables })
});

export const buildBody = query =>
  compose(
    setProp("body", {}),
    JSON.stringify,
    setProp("variables", { query })
  );

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
  //login: baseCall(queryLogin)(login),
  login: compose(
    fetchBase,
    buildBody(queryLogin)
  ),
  logout,
  me: sessionStorage.getItem("jwt")
    ? authCall(queryMe)(({ data }) => data.me)
    : () => Promise.reject()
};
