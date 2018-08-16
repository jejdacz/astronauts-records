import { combineReducers } from "redux";
import {
  REQUEST_ASTRONAUTS,
  RECEIVE_ASTRONAUTS,
  OPEN_EDITOR,
  CLOSE_EDITOR,
  EDIT_ASTRONAUT,
  UPDATE_EDITOR
} from "./actions.js";

const initialState = {
  isEditorActive: false,
  editor: {
    astronaut: {},
    fields: {}
  },
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
    case EDIT_ASTRONAUT:
      return updateObject(state, {
        isEditorActive: true,
        editor: editorReducer(state.editor, action)
      });
    case UPDATE_EDITOR:
      return updateObject(state, {
        editor: editorReducer(state.editor, action)
      });
    default:
      return state;
  }
};

const astronautToEditorFields = astronaut => {
  const astronautCopy = JSON.parse(JSON.stringify(astronaut));
  const { birth, ...rest } = astronautCopy;
  const parsedBirth = birth.split("-");

  return {
    ...rest,
    birth: { year: parsedBirth[0], month: parsedBirth[1], day: parsedBirth[2] }
  };
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case EDIT_ASTRONAUT:
      return updateObject(state, {
        fields: astronautToEditorFields(action.astronaut)
      });
    case UPDATE_EDITOR:
      return {
        ...state,
        fields: { ...state.fields, ...action.field }
      };
    default:
      return state;
  }
};

export default appReducer;
