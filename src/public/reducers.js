import { combineReducers } from "redux";
import {
  RECEIVE_ASTRONAUTS,
  REQUEST_ASTRONAUTS,
  OPEN_EDITOR,
  CLOSE_EDITOR
} from "./actions.js";

const initialState = {
  isEditorActive: false,
  astronauts: {
    isFetching: true,
    items: []
  }
};

const stubState = {
  isEditorActive: false,
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

const updateObject = (oldObject, newValues) =>
  Object.assign({}, oldObject, newValues);

const astronautsReducer = (state, action) => {
  switch (action.type) {
    case RECEIVE_ASTRONAUTS:
      return updateObject(state, {
        isFetching: false,
        items: action.astronauts
      });
    case REQUEST_ASTRONAUTS:
      return updateObject(state, {
        isFetching: true
      });
    default:
      return state;
  }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ASTRONAUTS:
    case RECEIVE_ASTRONAUTS:
      return updateObject(state, {
        astronauts: astronautsReducer(state.astronauts, action)
      });
    case OPEN_EDITOR:
      return updateObject(state, {
        isEditorActive: true
      });
    case CLOSE_EDITOR:
      return updateObject(state, {
        isEditorActive: false
      });
    default:
      return state;
  }
};
/*
const editor = (state = null, action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, { ...action.record }];
    default:
      return state;
  }
};*/

export default appReducer;

/*
export default combineReducers({
  astronauts,
  editor
});*/
