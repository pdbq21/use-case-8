export const SET_ERRORS = 'SET_ERRORS';
export const SUBMIT_FORM = 'SUBMIT_FORM';

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors
});
export const submitForm = formData => ({
  type: SUBMIT_FORM,
  payload: formData,
});
