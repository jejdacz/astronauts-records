//import api from "./utils/astronautsApi.js";
import api from "./utils/fakeApi.js";

export const LOAD_ASTRONAUTS_REQUEST = "LOAD_ASTRONAUTS_REQUEST";
export const LOAD_ASTRONAUTS_SUCCESS = "LOAD_ASTRONAUTS_SUCCESS";
export const LOAD_ASTRONAUTS_ERROR = "LOAD_ASTRONAUTS_ERROR";

export const loadAstronautsAction = {};

loadAstronautsAction.request = request => ({
  type: LOAD_ASTRONAUTS_REQUEST,
  request
});

loadAstronautsAction.success = success => ({
  type: LOAD_ASTRONAUTS_SUCCESS,
  success
});

loadAstronautsAction.error = error => ({
  type: LOAD_ASTRONAUTS_ERROR,
  error
});

export const ADD_ASTRONAUT_RESET = "ADD_ASTRONAUT_RESET";
export const ADD_ASTRONAUT_REQUEST = "ADD_ASTRONAUT_REQUEST";
export const ADD_ASTRONAUT_SUCCESS = "ADD_ASTRONAUT_SUCCESS";
export const ADD_ASTRONAUT_ERROR = "ADD_ASTRONAUT_ERROR";

export const addAstronautAction = {};

addAstronautAction.reset = reset => ({
  type: ADD_ASTRONAUT_RESET,
  reset
});

addAstronautAction.request = request => ({
  type: ADD_ASTRONAUT_REQUEST,
  request
});

addAstronautAction.success = success => ({
  type: ADD_ASTRONAUT_SUCCESS,
  success
});

addAstronautAction.error = error => ({
  type: ADD_ASTRONAUT_ERROR,
  error
});

export const DELETE_ASTRONAUT_REQUEST = "DELETE_ASTRONAUT_REQUEST";
export const DELETE_ASTRONAUT_SUCCESS = "DELETE_ASTRONAUT_SUCCESS";
export const DELETE_ASTRONAUT_ERROR = "DELETE_ASTRONAUT_ERROR";

export const deleteAstronautAction = {};

deleteAstronautAction.request = request => ({
  type: DELETE_ASTRONAUT_REQUEST,
  request
});

deleteAstronautAction.success = success => ({
  type: DELETE_ASTRONAUT_SUCCESS,
  success
});

deleteAstronautAction.error = error => ({
  type: DELETE_ASTRONAUT_ERROR,
  error
});

export const RESET_ASTRONAUT = "RESET_ASTRONAUT";

export const resetAstronautAction = () => ({
  type: RESET_ASTRONAUT
});

export const LOAD_ASTRONAUT_REQUEST = "LOAD_ASTRONAUT_REQUEST";
export const LOAD_ASTRONAUT_SUCCESS = "LOAD_ASTRONAUT_SUCCESS";
export const LOAD_ASTRONAUT_ERROR = "LOAD_ASTRONAUT_ERROR";

export const loadAstronautAction = {};

loadAstronautAction.request = request => ({
  type: LOAD_ASTRONAUT_REQUEST,
  request
});

loadAstronautAction.success = success => ({
  type: LOAD_ASTRONAUT_SUCCESS,
  success
});

loadAstronautAction.error = error => ({
  type: LOAD_ASTRONAUT_ERROR,
  error
});

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
export const resetAstronaut = resetAstronautAction();

export const loadAstronaut = apiCall(api.astronaut, loadAstronautAction);
/*
export const loadAstronautFromStore = ({ id }) => (dispatch, getState) => {
  const astronaut = getState().astronauts.items.find(a => a.id === id);
  astronaut
    ? dispatch(loadAstronautAction.success(astronaut))
    : dispatch(loadAstronautAction.error({ message: "Not found" }));
};*/

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
