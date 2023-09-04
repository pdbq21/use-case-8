import * as types from './actionTypes';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  message: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case types.UPDATE_LAST_NAME:
      return { ...state, lastName: action.payload };
    case types.UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case types.UPDATE_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
