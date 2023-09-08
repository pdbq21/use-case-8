import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, setErrors } from './actions';
import { useValidation } from './hooks';

const FormComponent = () => {
  const formData = useSelector(state => state.formData);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();
  const { validateInput, validateForm } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm(name, value));
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldErrors = validateInput(name, value);
    dispatch(setErrors({ ...errors, ...fieldErrors }));
  }

  const handleFocus = (e) => {
    const { name } = e.target;
    // Hide the error message for the focused field
    if (errors[name]) {
      dispatch(setErrors({ ...errors, [name]: null }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    dispatch(setErrors(formErrors));

    if (Object.keys(formErrors).length === 0) {
      console.log("Form data submitted:", formData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        ></textarea>
        {errors.message && <div className="error">{errors.message}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
