import validator from 'validator';

export const ERROR_EMAIL_INVALID = 'Email format is invalid.'
export const ERROR_MESSAGE_EMPTY = "Message is required.";
export const ERROR_MESSAGE_INVALID = "Message should be between 10 to 500 characters.";
export const ERROR_FIRSTNAME_EMPTY = 'First name is required.'
export const ERROR_LASTNAME_EMPTY = 'Last name is required.'
export const ERROR_FIRSTNAME_INVALID = 'First name can only contain letters, hyphens, apostrophes, and spaces.'
export const ERROR_LASTNAME_INVALID = 'Last name can only contain letters, hyphens, apostrophes, and spaces.'

export function useValidation() {
  const validateInput = (name, value) => {
    let errors = {};

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (validator.isEmpty(value)) {
          errors[name] = name === 'firstName' ? ERROR_FIRSTNAME_EMPTY : ERROR_LASTNAME_EMPTY;
        } else if (!validator.isAlpha(value.replace(/[-\s']/g, ''), 'en-US')) {
          errors[name] = name === 'firstName' ? ERROR_FIRSTNAME_INVALID : ERROR_LASTNAME_INVALID;
        }
        break;

      case 'email':
        if (!validator.isEmail(value)) {
          errors.email = ERROR_EMAIL_INVALID;
        }
        break;

      case 'message':
        if (validator.isEmpty(value)) {
          errors.message = ERROR_MESSAGE_EMPTY;
        } else if (!validator.isLength(value, { min: 10, max: 500 })) {
          errors.message = ERROR_MESSAGE_INVALID;
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
