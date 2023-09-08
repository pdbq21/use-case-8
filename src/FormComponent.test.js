import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from './store';
import FormComponent from './FormComponent';
import {
  ERROR_EMAIL_INVALID,
  ERROR_LASTNAME_INVALID,
  ERROR_FIRSTNAME_INVALID,
  ERROR_FIRSTNAME_EMPTY,
  ERROR_LASTNAME_EMPTY,
  ERROR_MESSAGE_EMPTY,
  ERROR_MESSAGE_INVALID
} from './hooks';

describe('<FormComponent />', () => {
  const mockFormData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    message: "Hello there!",
  };

  let renderedComponent;
  const fillOutForm = (data) => {
    fireEvent.change(screen.getByRole('textbox', {name: /First Name:/i}), {target: {value: data.firstName}});
    fireEvent.change(screen.getByRole('textbox', {name: /Last Name:/i}), {target: {value: data.lastName}});
    fireEvent.change(screen.getByRole('textbox', {name: /Email:/i}), {target: {value: data.email}});
    fireEvent.change(screen.getByRole('textbox', {name: /Message:/i}), {target: {value: data.message}});
  };

  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <FormComponent/>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
    renderedComponent = null;
  });

  test('submits the form with valid data', () => {
    fillOutForm(mockFormData);
    fireEvent.click(screen.getByRole('button', {name: /submit/i}));

    const currentState = store.getState();

    expect(currentState).toEqual({
      formSubmissions: [mockFormData],
      errors: {}
    });
  });

  test('form shows validation errors on submit with empty data', () => {
    const mockEmptyFormData = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };

    fillOutForm(mockEmptyFormData);
    fireEvent.click(screen.getByRole('button', {name: /submit/i}));

    const currentState = store.getState();

    expect(currentState).toEqual({
      formSubmissions: [],
      errors: {
        email: ERROR_EMAIL_INVALID,
        firstName: ERROR_FIRSTNAME_EMPTY,
        lastName: ERROR_LASTNAME_EMPTY,
        message: ERROR_MESSAGE_EMPTY
      }
    });

    expect(screen.getByText(ERROR_FIRSTNAME_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_LASTNAME_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_EMAIL_INVALID)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE_EMPTY)).toBeInTheDocument();
  });

  test('form shows validation errors on submit with invalid email', () => {
    const mockInvalidEmailFormData = {
      ...mockFormData,
      email: "john.doe",
    };

    fillOutForm(mockInvalidEmailFormData);
    fireEvent.click(screen.getByRole('button', {name: /submit/i}));

    const currentState = store.getState();

    expect(currentState).toEqual({
      formSubmissions: [],
      errors: {
        email: ERROR_EMAIL_INVALID,
      }
    });

    expect(screen.getByText(ERROR_EMAIL_INVALID)).toBeInTheDocument();
  });

  test('form shows validation errors on submit with invalid data', () => {
    const mockInvalidEmailFormData = {
      ...mockFormData,
      firstName: "-",
      lastName: "-",
      message: "test",
    };

    fillOutForm(mockInvalidEmailFormData);
    fireEvent.click(screen.getByRole('button', {name: /submit/i}));

    const currentState = store.getState();

    expect(currentState).toEqual({
      formSubmissions: [],
      errors: {
        firstName: ERROR_FIRSTNAME_INVALID,
        lastName: ERROR_LASTNAME_INVALID,
        message: ERROR_MESSAGE_INVALID
      }
    });

    expect(screen.getByText(ERROR_FIRSTNAME_INVALID)).toBeInTheDocument();
    expect(screen.getByText(ERROR_LASTNAME_INVALID)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE_INVALID)).toBeInTheDocument();
  });
});
