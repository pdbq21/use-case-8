import { SET_ERRORS, SUBMIT_FORM } from './actions';

const initialState = {
  formSubmissions: [],
  errors: {}
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload
        }
      };

    case SUBMIT_FORM:
      return {
        ...state,
        formSubmissions: [...state.formSubmissions, action.payload],
      };

    default:
      return state;
  }
}

export default formReducer;
