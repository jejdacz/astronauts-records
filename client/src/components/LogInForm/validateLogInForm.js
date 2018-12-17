import { isValidDate, isValidName } from "input-validation";

const validateLogInForm = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 4) {
    errors.name = "Length 4+ required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Length 8+ required";
  }

  return errors;
};

export default validateLogInForm;
