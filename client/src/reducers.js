import { combineReducers } from "react-redux";
import {
  LOAD_ASTRONAUTS_REQUEST,
  LOAD_ASTRONAUTS_SUCCESS,
  LOAD_ASTRONAUTS_ERROR,
  LOAD_ASTRONAUTS_CLEAR,
  ADD_ASTRONAUT_REQUEST,
  ADD_ASTRONAUT_SUCCESS,
  ADD_ASTRONAUT_ERROR,
  ADD_ASTRONAUT_CLEAR,
  DELETE_ASTRONAUT_REQUEST,
  DELETE_ASTRONAUT_SUCCESS,
  DELETE_ASTRONAUT_ERROR,
  RESET_ASTRONAUT,
  LOAD_ASTRONAUT_REQUEST,
  LOAD_ASTRONAUT_SUCCESS,
  LOAD_ASTRONAUT_ERROR,
  UPDATE_ASTRONAUT_REQUEST,
  UPDATE_ASTRONAUT_SUCCESS,
  UPDATE_ASTRONAUT_ERROR,
  UPDATE_ASTRONAUT_CLEAR,
  LAST_UPDATED_CLEAR,
  LAST_UPDATED_REQUEST,
  LAST_UPDATED_ERROR,
  LAST_UPDATED_SUCCESS,
  CLEAR_ERROR
} from "./astronautActions.js";
import {
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG
} from "./deleteDialogActions.js";

const initialState = {
  pending: false,
  error: null,
  changed: false,
  astronauts: { byId: {}, allIds: [] },
  lastUpdated: 0
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
        items: action.success,
        receivedAt: Date.now(),
        shouldRefresh: false
      };
    case LOAD_ASTRONAUTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOAD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        items: { ...state.items, ...action.success }
      };
    case DELETE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        //items: state.items.filter(i => i.id !== action.success.id),
        shouldRefresh: true
      };
    case UPDATE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        /*      items: state.items.map(i => {
          if (i.id === action.success.id) {
            return action.success;
          } else {
            return i;
          }
        }),*/
        shouldRefresh: true
      };
    case ADD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        //  items: [...state.items, action.success],
        shouldRefresh: true
      };
    default:
      return state;
  }
};

const lastUpdatedReducer = (state, action) => {
  switch (
    action.type // LOAD_ASTRONAUT_RESET
  ) {
    case LAST_UPDATED_CLEAR:
      return null;
    case LAST_UPDATED_REQUEST:
    case LAST_UPDATED_ERROR:
    case LAST_UPDATED_SUCCESS:
      return action;
    default:
      return state;
  }
};

const deleteAstronautReducer = (state, action) => {
  switch (action.type) {
    case RESET_ASTRONAUT:
      return null;
    case DELETE_ASTRONAUT_REQUEST:
    case DELETE_ASTRONAUT_ERROR:
    case DELETE_ASTRONAUT_SUCCESS:
      return action;
    default:
      return state;
  }
};

const updateAstronautReducer = (state, action) => {
  switch (action.type) {
    case RESET_ASTRONAUT:
    case UPDATE_ASTRONAUT_CLEAR:
      return null;
    case UPDATE_ASTRONAUT_REQUEST:
    case UPDATE_ASTRONAUT_ERROR:
    case UPDATE_ASTRONAUT_SUCCESS:
      return action;
    default:
      return state;
  }
};

const addAstronautReducer = (state, action) => {
  switch (action.type) {
    case RESET_ASTRONAUT:
    case ADD_ASTRONAUT_CLEAR:
      return null;
    case ADD_ASTRONAUT_REQUEST:
    case ADD_ASTRONAUT_ERROR:
    case ADD_ASTRONAUT_SUCCESS:
      return action;
    default:
      return state;
  }
};

const storeAstronauts = items => ({
  byId: items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
  allIds: items.map(item => item.id)
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return { ...state, error: null };
    case LOAD_ASTRONAUTS_REQUEST:
      return { ...state, pending: true };
    case LOAD_ASTRONAUTS_ERROR:
      return {
        ...state,
        pending: false,
        error: "Loading of astronauts failed. Please try reload the page later."
      };
    case LOAD_ASTRONAUTS_SUCCESS:
      return {
        ...state,
        pending: false,
        astronauts: storeAstronauts(action.success),
        lastUpdated: Date.now()
      };
    default:
      return state;
  }
};

export default rootReducer;
