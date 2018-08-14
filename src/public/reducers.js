import { combineReducers } from "redux";
import {
  RECEIVE_ASTRONAUTS,
  REQUEST_ASTRONAUTS,
  EDITOR_OPENED
} from "./actions.js";

const initialState = {
  astronauts: {
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

const astronautsReducer = (state = initialState.astronauts, action) => {
  switch (action.type) {
    case RECEIVE_ASTRONAUTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.astronauts
      });
    case REQUEST_ASTRONAUTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
};

const appReducer = (state = null, action) => {
  switch (action.type) {
    case REQUEST_ASTRONAUTS:
    case RECEIVE_ASTRONAUTS:
      return astronautsReducer(state.astronauts, action);
    case EDITOR_OPENED:
      return Object.assign({}, state, {
        editorOpened: true
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

export default appReducer;

/*
export default combineReducers({
  astronauts,
  editor
});*/
