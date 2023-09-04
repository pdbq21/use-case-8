import * as types from './actionTypes';

export const updateFirstName = (firstName) => ({
  type: types.UPDATE_FIRST_NAME,
  payload: firstName
});

export const updateLastName = (lastName) => ({
  type: types.UPDATE_LAST_NAME,
  payload: lastName
});

export const updateEmail = (email) => ({
  type: types.UPDATE_EMAIL,
  payload: email
});

export const updateMessage = (message) => ({
  type: types.UPDATE_MESSAGE,
  payload: message
});
