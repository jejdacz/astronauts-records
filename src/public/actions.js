import api from "./astronauts-api.js";

export const OPEN_EDITOR = "OPEN_EDITOR";
export const CLOSE_EDITOR = "CLOSE_EDITOR";

export const EDIT_ASTRONAUT = "EDIT_ASTRONAUT";
export const UPDATE_EDITOR = "UPDATE_EDITOR";
export const EDITOR_SUBMIT = "EDITOR_SUBMIT";

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
  dispatch(requestAddAstronaut());
  return api
    .addAstronaut(astronaut)
    .then(data => dispatch(receiveAddAstronaut(data)))
    .catch(err => console.warn(err.message));
};

export const editAstronaut = astronaut => ({
  type: EDIT_ASTRONAUT,
  astronaut
});

export const updateEditor = field => ({
  type: UPDATE_EDITOR,
  field
});

export const editorSubmit = () => ({
  type: EDITOR_SUBMIT
});
