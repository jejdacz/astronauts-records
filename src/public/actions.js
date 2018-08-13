import api from "./api.js";

export const REQUEST_RECORDS = "REQUEST_RECORDS";
export const RECEIVE_RECORDS = "RECEIVE_RECORDS";

const receiveRecords = records => ({
  type: RECEIVE_RECORDS,
  records
});

const requestRecords = () => ({
  type: REQUEST_RECORDS
});

export const fetchRecords = (dispatch, getState) => {
  dispatch(requestRecords());
  return api
    .fetchAll()
    .then(data => dispatch(receiveRecords(data)))
    .catch(err => console.warn(err.message));
};
