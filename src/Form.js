import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFirstName, updateLastName, updateEmail, updateMessage } from './actions';

const FormComponent = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, message } = useSelector((state) => state);

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => dispatch(updateFirstName(e.target.value))}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => dispatch(updateLastName(e.target.value))}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => dispatch(updateEmail(e.target.value))}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => dispatch(updateMessage(e.target.value))}
      />
    </div>
  );
};

export default FormComponent;
