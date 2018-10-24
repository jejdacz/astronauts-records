//import api from "./utils/astronautsApi.js";
import api from "./fakeApi.js";

export const LOAD_ASTRONAUTS_REQUEST = "LOAD_ASTRONAUTS_REQUEST";
export const LOAD_ASTRONAUTS_SUCCESS = "LOAD_ASTRONAUTS_SUCCESS";
export const LOAD_ASTRONAUTS_FAILURE = "LOAD_ASTRONAUTS_FAILURE";

export const loadAstronautsAction = {};

loadAstronautsAction.request = () => ({
  type: LOAD_ASTRONAUTS_REQUEST
});

loadAstronautsAction.success = data => ({
  type: LOAD_ASTRONAUTS_SUCCESS,
  astronauts: data
});

loadAstronautsAction.failure = error => ({
  type: LOAD_ASTRONAUTS_FAILURE,
  error
});

export const ADD_ASTRONAUT_REQUEST = "ADD_ASTRONAUT_REQUEST";
export const ADD_ASTRONAUT_SUCCESS = "ADD_ASTRONAUT_SUCCESS";
export const ADD_ASTRONAUT_FAILURE = "ADD_ASTRONAUT_FAILURE";

export const addAstronautAction = {};

addAstronautAction.request = astronaut => ({
  type: ADD_ASTRONAUT_REQUEST,
  astronaut
});

addAstronautAction.success = data => ({
  type: ADD_ASTRONAUT_SUCCESS,
  response: data
});

addAstronautAction.failure = error => ({
  type: ADD_ASTRONAUT_FAILURE,
  error
});

export const DELETE_ASTRONAUT_REQUEST = "DELETE_ASTRONAUT_REQUEST";
export const DELETE_ASTRONAUT_SUCCESS = "DELETE_ASTRONAUT_SUCCESS";
export const DELETE_ASTRONAUT_FAILURE = "DELETE_ASTRONAUT_FAILURE";
export const DELETE_ASTRONAUT_RESET = "DELETE_ASTRONAUT_RESET";

export const deleteAstronautAction = {};

deleteAstronautAction.request = id => ({
  type: DELETE_ASTRONAUT_REQUEST,
  id
});

deleteAstronautAction.success = data => ({
  type: DELETE_ASTRONAUT_SUCCESS,
  response: data
});

deleteAstronautAction.failure = error => ({
  type: DELETE_ASTRONAUT_FAILURE,
  error
});

deleteAstronautAction.reset = () => ({
  type: DELETE_ASTRONAUT_RESET
});

export const LOAD_ASTRONAUT_REQUEST = "LOAD_ASTRONAUT_REQUEST";
export const LOAD_ASTRONAUT_SUCCESS = "LOAD_ASTRONAUT_SUCCESS";
export const LOAD_ASTRONAUT_FAILURE = "LOAD_ASTRONAUT_FAILURE";

export const loadAstronautAction = {};

loadAstronautAction.request = id => ({
  type: LOAD_ASTRONAUT_REQUEST,
  id
});

loadAstronautAction.success = data => ({
  type: LOAD_ASTRONAUT_SUCCESS,
  astronaut: data
});

loadAstronautAction.failure = error => ({
  type: LOAD_ASTRONAUT_FAILURE,
  error
});

export const apiCall = (
  apiCallFunc,
  { request, success, failure }
) => apiCallArgs => (dispatch, getState) => {
  dispatch(request(apiCallArgs));
  return apiCallFunc(apiCallArgs)
    .then(data => dispatch(success(data)))
    .catch(err => dispatch(failure(err)));
};

export const loadAstronauts = apiCall(api.astronauts, loadAstronautsAction);
export const addAstronaut = apiCall(api.addAstronaut, addAstronautAction);
export const deleteAstronaut = apiCall(
  api.deleteAstronaut,
  deleteAstronautAction
);
export const resetDeletedAstronaut = deleteAstronautAction.reset();
export const loadAstronaut = apiCall(api.astronaut, loadAstronautAction);

export const updateAstronaut = astronaut => (dispatch, getState) => {};

export const shouldLoadAstronauts = (state, lastUpdated) => {
  if (state.astronauts.items.length === 0) {
    return Promise.resolve(true);
  } else if (state.astronauts.loading) {
    return Promise.resolve(false);
  } else {
    return lastUpdated().then(
      val =>
        val > state.astronauts.receivedAt
          ? Promise.resolve(true)
          : Promise.resolve(false)
    );
  }
};

export const loadAstronautsIfNeeded = (dispatch, getState) =>
  shouldLoadAstronauts(getState(), api.lastUpdated)
    .then(res => (res ? dispatch(loadAstronauts()) : Promise.resolve()))
    .catch(err => dispatch(loadAstronautsAction.failure(err)));
