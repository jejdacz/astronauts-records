const validateLogInForm = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default validateLogInForm;
