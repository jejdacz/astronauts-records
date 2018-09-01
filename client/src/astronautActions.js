import api from "./astronautsApi.js";

export const LOAD_ASTRONAUTS_REQUEST = "LOAD_ASTRONAUTS_REQUEST";
export const LOAD_ASTRONAUTS_SUCCESS = "LOAD_ASTRONAUTS_SUCCESS";
export const LOAD_ASTRONAUTS_FAIL = "LOAD_ASTRONAUTS_FAIL";

const loadAstronautsRequest = () => ({
  type: LOAD_ASTRONAUTS_REQUEST
});

const loadAstronautsSuccess = data => ({
  type: LOAD_ASTRONAUTS_SUCCESS,
  astronauts: data
});

const loadAstronautsFail = error => ({
  type: LOAD_ASTRONAUTS_FAIL,
  error
});

export const loadAstronauts = (dispatch, getState) => {
  dispatch(loadAstronautsRequest());
  return api
    .astronauts()
    .then(data => dispatch(loadAstronautsSuccess(data)))
    .catch(err => dispatch(loadAstronautsFail(err)));
};

export const loadAstronaut = astronaut => (dispatch, getState) => {
  /*dispatch(requestAddAstronaut());
  return api
    .addAstronaut(astronaut)
    .then(data => dispatch(receiveAddAstronaut(data)))
    .catch(err => console.warn(err.message));*/
};

export const addAstronaut = astronaut => (dispatch, getState) => {
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

export const loadAstronautsIfNeeded = (dispatch, getState) => {
  if (getState().astronauts.items.length === 0) {
    return dispatch(loadAstronauts);
  } else if (getState().astronauts.loading) {
    return Promise.resolve();
  } else {
    return api
      .lastUpdated()
      .then(
        ({ lastUpdated }) =>
          lastUpdated > getState().astronauts.receivedAt
            ? dispatch(loadAstronauts)
            : Promise.resolve()
      )
      .catch(err => console.warn(err.message));
  }
};

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
