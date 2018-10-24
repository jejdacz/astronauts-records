import {
  LOAD_ASTRONAUTS_REQUEST,
  LOAD_ASTRONAUTS_SUCCESS,
  LOAD_ASTRONAUTS_FAILURE,
  ADD_ASTRONAUT_REQUEST,
  ADD_ASTRONAUT_SUCCESS,
  ADD_ASTRONAUT_FAILURE,
  DELETE_ASTRONAUT_REQUEST,
  DELETE_ASTRONAUT_SUCCESS,
  DELETE_ASTRONAUT_FAILURE,
  DELETE_ASTRONAUT_RESET,
  LOAD_ASTRONAUT_REQUEST,
  LOAD_ASTRONAUT_SUCCESS,
  LOAD_ASTRONAUT_FAILURE
} from "./astronautActions.js";

const initialState = {
  astronauts: {
    loading: false,
    error: null,
    items: [],
    receivedAt: 0
  },
  newAstronaut: {
    saving: false,
    error: null,
    astronaut: {},
    response: null
  },
  deletedAstronaut: {
    pending: false,
    error: null,
    id: null,
    response: null
  },
  astronaut: {
    pending: false,
    error: null,
    astronaut: {},
    response: null
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
        error: null,
        astronaut: action.astronaut,
        response: null
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

const deletedAstronautReducer = (state, action) => {
  switch (action.type) {
    case DELETE_ASTRONAUT_REQUEST:
      return {
        ...state,
        pending: true,
        error: null,
        id: action.id,
        response: null
      };
    case DELETE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        response: action.response
      };
    case DELETE_ASTRONAUT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case DELETE_ASTRONAUT_RESET:
      return {
        ...state,
        pending: false,
        error: null,
        id: null,
        response: null
      };
    default:
      return state;
  }
};

const astronautReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ASTRONAUT_REQUEST:
      return {
        ...state,
        pending: true,
        error: null
      };
    case LOAD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        astronaut: action.astronaut
      };
    case LOAD_ASTRONAUT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

const rootReducer = (state = initialState, action) => ({
  astronauts: astronautsReducer(state.astronauts, action),
  newAstronaut: newAstronautReducer(state.newAstronaut, action),
  deletedAstronaut: deletedAstronautReducer(state.deletedAstronaut, action),
  astronaut: astronautReducer(state.astronaut, action)
});

export default rootReducer;
