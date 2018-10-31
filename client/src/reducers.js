import {
  LOAD_ASTRONAUTS_REQUEST,
  LOAD_ASTRONAUTS_SUCCESS,
  LOAD_ASTRONAUTS_ERROR,
  ADD_ASTRONAUT_REQUEST,
  ADD_ASTRONAUT_SUCCESS,
  ADD_ASTRONAUT_ERROR,
  DELETE_ASTRONAUT_REQUEST,
  DELETE_ASTRONAUT_SUCCESS,
  DELETE_ASTRONAUT_ERROR,
  RESET_ASTRONAUT,
  LOAD_ASTRONAUT_REQUEST,
  LOAD_ASTRONAUT_SUCCESS,
  LOAD_ASTRONAUT_ERROR
} from "./astronautActions.js";
import {
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG
} from "./deleteDialogActions.js";

const initialState = {
  deleteDialog: {
    isOpen: false,
    astronaut: {}
  },
  astronauts: {
    loading: false,
    error: null,
    items: [],
    receivedAt: 0,
    shouldRefresh: true
  },
  loadAstronaut: {
    action: null,
    astronaut: {}
  },
  deleteAstronaut: {
    action: null
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
        items: action.success,
        receivedAt: Date.now()
      };
    case LOAD_ASTRONAUTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

const loadAstronautReducer = (state, action) => {
  switch (
    action.type // LOAD_ASTRONAUT_RESET
  ) {
    case RESET_ASTRONAUT:
      return {
        action: null,
        astronaut: {}
      };
    case LOAD_ASTRONAUT_REQUEST:
    case LOAD_ASTRONAUT_ERROR:
      return {
        ...state,
        action
      };
    case LOAD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        action,
        astronaut: action.success
      };
    default:
      return state;
  }
};

const deleteAstronautReducer = (state, action) => {
  switch (action.type) {
    case RESET_ASTRONAUT:
      return {
        action: null
      };
    case DELETE_ASTRONAUT_REQUEST:
    case DELETE_ASTRONAUT_ERROR:
    case DELETE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        action
      };
    default:
      return state;
  }
};

const deleteDialogReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DELETE_DIALOG:
      return {
        ...state,
        isOpen: true,
        astronaut: action.astronaut
      };
    case CLOSE_DELETE_DIALOG:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};

/*
const activeAstronautReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ASTRONAUT_REQUEST:
      return {
        action: action.type,
        pending: true,
        error: null,
        response: null,
        astronaut: {}
      };
    case LOAD_ASTRONAUT_SUCCESS:
      return {
        action: action.type,
        pending: false,
        error: null,
        response: null,
        astronaut: action.astronaut
      };
    case LOAD_ASTRONAUT_ERROR:
      return {
        action: action.type,
        pending: false,
        error: action.error,
        response: null,
        astronaut: {}
      };
    case ADD_ASTRONAUT_REQUEST:
      return {
        action: action.type,
        pending: true,
        error: null,
        response: null,
        astronaut: action.astronaut
      };
    case ADD_ASTRONAUT_SUCCESS:
      return {
        action: action.type,
        pending: false,
        error: null,
        response: action.response,
        astronaut: {}
      };
    case ADD_ASTRONAUT_ERROR:
      return {
        ...state,
        action: action.type,
        pending: false,
        error: action.error,
        response: null
      };
    case DELETE_ASTRONAUT_REQUEST:
      return {
        action: action.type,
        pending: true,
        error: null,
        astronaut: { id: action.id },
        response: null
      };
    case DELETE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        action: action.type,
        pending: false,
        error: null,
        response: action.response
      };
    case DELETE_ASTRONAUT_ERROR:
      return {
        ...state,
        action: action.type,
        pending: false,
        error: action.error,
        response: null
      };
    case ASTRONAUT_RESET:
      return {
        action: null,
        pending: false,
        error: null,
        response: null,
        astronaut: {}
      };
    default:
      return state;
  }
};*/

const rootReducer = (state = initialState, action) => ({
  astronauts: astronautsReducer(state.astronauts, action),
  //newAstronaut: newAstronautReducer(state.newAstronaut, action),
  //deletedAstronaut: deletedAstronautReducer(state.deletedAstronaut, action),
  loadAstronaut: loadAstronautReducer(state.loadAstronaut, action),
  deleteAstronaut: deleteAstronautReducer(state.deleteAstronaut, action),
  deleteDialog: deleteDialogReducer(state.deleteDialog, action)
});

export default rootReducer;
