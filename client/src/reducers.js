import { combineReducers } from "redux";
import {
  LOAD_ASTRONAUTS_REQUEST,
  LOAD_ASTRONAUTS_SUCCESS,
  LOAD_ASTRONAUTS_FAILURE,
  ADD_ASTRONAUT_REQUEST,
  ADD_ASTRONAUT_SUCCESS,
  ADD_ASTRONAUT_FAILURE
} from "./astronautActions.js";

const initialState = {
  newAstronaut: {
    saving: false,
    error: null,
    response: null
  },
  astronauts: {
    loading: false,
    error: null,
    items: [],
    receivedAt: 0
  }
};

const astronautsReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ASTRONAUTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_ASTRONAUTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.astronauts,
        receivedAt: Date.now()
      };
    case LOAD_ASTRONAUTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

const newAstronautReducer = (state, action) => {
  switch (action.type) {
    case ADD_ASTRONAUT_REQUEST:
      return {
        ...state,
        saving: true,
        error: null
      };
    case ADD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        saving: false,
        error: null,
        response: action.response
      };
    case ADD_ASTRONAUT_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.error
      };
    default:
      return state;
  }
};
/*
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ASTRONAUTS:
    case RECEIVE_ASTRONAUTS:
      return updateObject(state, {
        astronauts: astronautsReducer(state.astronauts, action)
      });
    case OPEN_EDITOR:
      return updateObject(state, {
        isEditorActive: true,
        editor: editorReducer(state.editor, action)
      });
    case CLOSE_EDITOR:
      return updateObject(state, {
        isEditorActive: false
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
    case OPEN_EDITOR:
      return { ...state, fields: JSON.parse(JSON.stringify(action.astronaut)) };
    case UPDATE_EDITOR:
      return {
        ...state,
        fields: { ...state.fields, ...action.field }
      };
    case CLOSE_EDITOR:
      return { ...state, fields: {} };
    default:
      return state;
  }
};
*/
const rootReducer = (state = initialState, action) => ({
  astronauts: astronautsReducer(state.astronauts, action),
  newAstronaut: newAstronautReducer(state.newAstronaut, action)
});

export default rootReducer;
