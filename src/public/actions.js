import api from "./astronauts-api.js";

export const OPEN_EDITOR = "OPEN_EDITOR";
export const CLOSE_EDITOR = "CLOSE_EDITOR";

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
