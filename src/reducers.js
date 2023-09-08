import { UPDATE_FORM, SET_ERRORS } from './actions';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  },
  errors: {}
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value
        }
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

export default formReducer;
