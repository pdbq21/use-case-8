// useValidation.js

export function useValidation() {
  const validateInput = (name, value) => {
    let errors = {};

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value) {
          errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required.`;
        } else if (!/^[a-zA-Z-' ]+$/.test(value)) {
          errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters, hyphens, apostrophes, and spaces.`;
        } else if (value.length < 2 || value.length > 50) {
          errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name should be between 2 to 50 characters.`;
        }
        break;

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!value) {
          errors.email = "Email is required.";
        } else if (!emailRegex.test(value)) {
          errors.email = "Email format is invalid.";
        } else if (value.length < 5 || value.length > 100) {
          errors.email = "Email should be between 5 to 100 characters.";
        }
        break;

      case 'message':
        if (!value) {
          errors.message = "Message is required.";
        } else if (value.length < 10 || value.length > 500) {
          errors.message = "Message should be between 10 to 500 characters.";
        }
        break;

      default:
        break;
    }

    return errors;
  };

  const validateForm = (formData) => {
    let formErrors = {};

    Object.keys(formData).forEach(key => {
      const newErrors = validateInput(key, formData[key]);
      formErrors = { ...formErrors, ...newErrors };
    });

    return formErrors;
  };

  return { validateInput, validateForm };
}
