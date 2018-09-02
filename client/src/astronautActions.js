import api from "./astronautsApi.js";

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

addAstronautAction.request = () => ({
  type: ADD_ASTRONAUT_REQUEST
});

addAstronautAction.success = data => ({
  type: ADD_ASTRONAUT_SUCCESS,
  response: data
});

addAstronautAction.failure = error => ({
  type: ADD_ASTRONAUT_FAILURE,
  error
});

export const apiCall = (
  apiCallFunc,
  { request, success, failure }
) => apiCallArgs => (dispatch, getState) => {
  dispatch(request());
  return apiCallFunc(apiCallArgs)
    .then(data => dispatch(success(data)))
    .catch(err => dispatch(failure(err)));
};

export const loadAstronauts = apiCall(api.astronauts, loadAstronautsAction);
export const addAstronaut = apiCall(api.addAstronaut, addAstronautAction);

/*
export const loadAstronauts = (dispatch, getState) => {
  dispatch(loadAstronautsRequest());
  return api
    .astronauts()
    .then(data => dispatch(loadAstronautsSuccess(data)))
    .catch(err => dispatch(loadAstronautsFailure(err)));
};*/

export const loadAstronaut = astronaut => (dispatch, getState) => {
  /*dispatch(requestAddAstronaut());
  return api
    .addAstronaut(astronaut)
    .then(data => dispatch(receiveAddAstronaut(data)))
    .catch(err => console.warn(err.message));*/
};

export const updateAstronaut = astronaut => (dispatch, getState) => {
  /*dispatch(updateAstronautPending());
  return api
    .updateAstronaut(astronaut)
    .then(data => dispatch(updateAstronautSuccess(data)))
    .catch(err => dispatch(updateAstronautFailure(err.message)));*/
};

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
/*
export const loadAstronautsIfNeeded = (dispatch, getState) => {
  if (getState().astronauts.items.length === 0) {
    return dispatch(loadAstronauts());
  } else if (getState().astronauts.loading) {
    return Promise.resolve();
  } else {
    return api
      .lastUpdated()
      .then(
        lastUpdated =>
          lastUpdated > getState().astronauts.receivedAt
            ? dispatch(loadAstronauts())
            : Promise.resolve()
      )
      .catch(err => dispatch(loadAstronautsAction.failure(err)));
  }
};*/

/*
export const openEditor = astronaut => ({
  type: OPEN_EDITOR,
  astronaut
});

export const updateEditor = field => ({
  type: UPDATE_EDITOR,
  field
});

export const closeEditor = () => ({
  type: CLOSE_EDITOR
});*/
