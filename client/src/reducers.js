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
  LAST_UPDATED_SUCCESS
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
  loadAstronauts: null,
  loadAstronaut: null,
  deleteAstronaut: null,
  updateAstronaut: null,
  addAstronaut: null,
  lastUpdated: null,
  activeAstronaut: null
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

const loadAstronautsReducer = (state, action) => {
  switch (
    action.type // LOAD_ASTRONAUT_RESET
  ) {
    case LOAD_ASTRONAUTS_CLEAR:
      return null;
    case LOAD_ASTRONAUTS_REQUEST:
    case LOAD_ASTRONAUTS_ERROR:
    case LOAD_ASTRONAUTS_SUCCESS:
      return action;
    default:
      return state;
  }
};

const loadAstronautReducer = (state, action) => {
  switch (
    action.type // LOAD_ASTRONAUT_RESET
  ) {
    case RESET_ASTRONAUT:
      return null;
    case LOAD_ASTRONAUT_REQUEST:
    case LOAD_ASTRONAUT_ERROR:
    case LOAD_ASTRONAUT_SUCCESS:
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

const deleteDialogReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DELETE_DIALOG:
      return {
        isOpen: true,
        astronaut: action.astronaut
      };
    case CLOSE_DELETE_DIALOG:
      return {
        isOpen: false,
        astronaut: null
      };
    default:
      return state;
  }
};

const activeAstronautReducer = (state, action) => {
  switch (action.type) {
    case RESET_ASTRONAUT:
      //case DELETE_ASTRONAUT_SUCCESS:
      return null;
    case LOAD_ASTRONAUT_SUCCESS:
      return action.success;
    case UPDATE_ASTRONAUT_REQUEST:
    case ADD_ASTRONAUT_REQUEST:
      return action.request;
    default:
      return state;
  }
};

const rootReducer = (state = initialState, action) => ({
  astronauts: astronautsReducer(state.astronauts, action),
  loadAstronauts: loadAstronautsReducer(state.loadAstronauts, action),
  lastUpdated: lastUpdatedReducer(state.lastUpdated, action),
  //newAstronaut: newAstronautReducer(state.newAstronaut, action),
  //deletedAstronaut: deletedAstronautReducer(state.deletedAstronaut, action),
  loadAstronaut: loadAstronautReducer(state.loadAstronaut, action),
  deleteAstronaut: deleteAstronautReducer(state.deleteAstronaut, action),
  updateAstronaut: updateAstronautReducer(state.updateAstronaut, action),
  addAstronaut: addAstronautReducer(state.addAstronaut, action),
  deleteDialog: deleteDialogReducer(state.deleteDialog, action),
  activeAstronaut: activeAstronautReducer(state.activeAstronaut, action)
});

export default rootReducer;
