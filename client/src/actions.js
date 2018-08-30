import api from "./astronauts-api.js";

export const OPEN_EDITOR = "OPEN_EDITOR";
export const CLOSE_EDITOR = "CLOSE_EDITOR";
export const UPDATE_EDITOR = "UPDATE_EDITOR";

export const REQUEST_ASTRONAUTS = "REQUEST_ASTRONAUTS";
export const RECEIVE_ASTRONAUTS = "RECEIVE_ASTRONAUTS";

const receiveAstronauts = astronauts => ({
  type: RECEIVE_ASTRONAUTS,
  astronauts
});

const requestAstronauts = () => ({
  type: REQUEST_ASTRONAUTS
});

export const fetchAstronauts = (dispatch, getState) => {
  dispatch(requestAstronauts());
  return api
    .astronauts()
    .then(data => dispatch(receiveAstronauts(data)))
    .catch(err => console.warn(err.message));
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
});
