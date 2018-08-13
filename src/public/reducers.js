import { combineReducers } from "redux";
import { RECEIVE_RECORDS, REQUEST_RECORDS } from "./actions.js";

const initialState = {
  records: {
    isFetching: false,
    items: [
      {
        id: "0",
        firstName: "Neil",
        lastName: "Armstrong",
        birth: "9.8.1930",
        superPower: "Healing"
      },
      {
        id: "1",
        firstName: "Jurij",
        lastName: "Gagarin",
        birth: "9.8.1930",
        superPower: "Healing"
      }
    ]
  }
};

const records = (state = initialState.records, action) => {
  switch (action.type) {
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.records
      });
    case REQUEST_RECORDS:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
};

const editor = (state = null, action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, { ...action.record }];
    default:
      return state;
  }
};

export default combineReducers({
  records,
  editor
});
