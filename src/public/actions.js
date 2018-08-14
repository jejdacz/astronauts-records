import api from "./astronauts-api.js";

export const EDITOR_OPENED = "EDITOR_OPENED";
export const EDITOR_CLOSED = "EDITOR_CLOSED";

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
  return api.astronauts
    .fetchAll()
    .then(data => dispatch(receiveAstronauts(data)))
    .catch(err => console.warn(err.message));
};
