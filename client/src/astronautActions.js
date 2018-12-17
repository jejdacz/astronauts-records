import realApi from "./utils/astronautsApi.js";
import fakeApi from "./utils/fakeApi.js";

const api = process.env.NODE_ENV === "development" ? fakeApi : realApi;
//const api = realApi;

const buildAsyncAction = (requestName, successName, errorName) => ({
  request(args) {
    return { type: requestName, request: args };
  },
  success(args) {
    return { type: successName, success: args };
  },
  error(args) {
    return { type: errorName, error: args };
  }
});

export const LOAD_ASTRONAUTS_REQUEST = "LOAD_ASTRONAUTS_REQUEST";
export const LOAD_ASTRONAUTS_SUCCESS = "LOAD_ASTRONAUTS_SUCCESS";
export const LOAD_ASTRONAUTS_ERROR = "LOAD_ASTRONAUTS_ERROR";

export const loadAstronautsAction = buildAsyncAction(
  LOAD_ASTRONAUTS_REQUEST,
  LOAD_ASTRONAUTS_SUCCESS,
  LOAD_ASTRONAUTS_ERROR
);

export const DELETE_ASTRONAUT_REQUEST = "DELETE_ASTRONAUT_REQUEST";
export const DELETE_ASTRONAUT_SUCCESS = "DELETE_ASTRONAUT_SUCCESS";
export const DELETE_ASTRONAUT_ERROR = "DELETE_ASTRONAUT_ERROR";

export const deleteAstronautAction = buildAsyncAction(
  DELETE_ASTRONAUT_REQUEST,
  DELETE_ASTRONAUT_SUCCESS,
  DELETE_ASTRONAUT_ERROR
);

export const LOAD_ASTRONAUT_REQUEST = "LOAD_ASTRONAUT_REQUEST";
export const LOAD_ASTRONAUT_SUCCESS = "LOAD_ASTRONAUT_SUCCESS";
export const LOAD_ASTRONAUT_ERROR = "LOAD_ASTRONAUT_ERROR";

export const loadAstronautAction = buildAsyncAction(
  LOAD_ASTRONAUT_REQUEST,
  LOAD_ASTRONAUT_SUCCESS,
  LOAD_ASTRONAUT_ERROR
);

export const UPDATE_ASTRONAUT_REQUEST = "UPDATE_ASTRONAUT_REQUEST";
export const UPDATE_ASTRONAUT_SUCCESS = "UPDATE_ASTRONAUT_SUCCESS";
export const UPDATE_ASTRONAUT_ERROR = "UPDATE_ASTRONAUT_ERROR";

export const updateAstronautAction = buildAsyncAction(
  UPDATE_ASTRONAUT_REQUEST,
  UPDATE_ASTRONAUT_SUCCESS,
  UPDATE_ASTRONAUT_ERROR
);

export const ADD_ASTRONAUT_REQUEST = "ADD_ASTRONAUT_REQUEST";
export const ADD_ASTRONAUT_SUCCESS = "ADD_ASTRONAUT_SUCCESS";
export const ADD_ASTRONAUT_ERROR = "ADD_ASTRONAUT_ERROR";

export const addAstronautAction = buildAsyncAction(
  ADD_ASTRONAUT_REQUEST,
  ADD_ASTRONAUT_SUCCESS,
  ADD_ASTRONAUT_ERROR
);

export const LAST_UPDATED_REQUEST = "LAST_UPDATED_REQUEST";
export const LAST_UPDATED_ERROR = "LAST_UPDATED_ERROR";
export const LAST_UPDATED_SUCCESS = "LAST_UPDATED_SUCCESS";

export const lastUpdatedAction = buildAsyncAction(
  LAST_UPDATED_REQUEST,
  LAST_UPDATED_SUCCESS,
  LAST_UPDATED_ERROR
);

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginAction = buildAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
);

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logoutAction = buildAsyncAction(
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
);

export const ME_REQUEST = "ME_REQUEST";
export const ME_ERROR = "ME_ERROR";
export const ME_SUCCESS = "ME_SUCCESS";

export const meAction = buildAsyncAction(ME_REQUEST, ME_SUCCESS, ME_ERROR);

export const CLEAR_ERROR = "CLEAR_ERROR";
export const clearErrorAction = () => ({ type: CLEAR_ERROR });

export const CLEAR_CHANGED = "CLEAR_CHANGED";
export const clearChangedAction = () => ({ type: CLEAR_CHANGED });

export const apiCall = (
  apiCallFunc,
  { request, success, error }
) => apiCallArgs => (dispatch, getState) => {
  dispatch(request(apiCallArgs));
  return apiCallFunc(apiCallArgs)
    .then(data => dispatch(success(data)))
    .catch(err => dispatch(error(err)));
};

export const loadAstronauts = apiCall(api.astronauts, loadAstronautsAction);
export const addAstronaut = apiCall(api.addAstronaut, addAstronautAction);
export const deleteAstronaut = apiCall(
  api.deleteAstronaut,
  deleteAstronautAction
);
export const loadAstronaut = apiCall(api.astronaut, loadAstronautAction);
export const updateAstronaut = apiCall(
  api.updateAstronaut,
  updateAstronautAction
);

export const login = apiCall(api.login, loginAction);
export const logout = apiCall(api.logout, logoutAction);
export const me = apiCall(api.me, meAction);

export const shouldLoadAstronauts = (state, lastUpdated, dispatch) => {
  dispatch(lastUpdatedAction.request());
  if (state.astronauts.allIds.length === 0) {
    return Promise.resolve(true);
  } else if (state.pending) {
    return Promise.resolve(false);
  } else {
    return lastUpdated()
      .then(val => {
        dispatch(lastUpdatedAction.success());
        return val > state.lastUpdated
          ? Promise.resolve(true)
          : Promise.resolve(false);
      })
      .catch(err => dispatch(lastUpdatedAction.error(err)));
  }
};

export const loadAstronautsIfNeeded = (dispatch, getState) =>
  shouldLoadAstronauts(getState(), api.lastUpdated, dispatch).then(
    res => (res ? dispatch(loadAstronauts()) : Promise.resolve())
  );
