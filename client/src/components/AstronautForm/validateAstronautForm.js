import { isValidDate, isValidName } from "input-validation";

const validateAstronautForm = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (!isValidName(values.firstName)) {
    errors.firstName = "Invalid";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (!isValidName(values.lastName)) {
    errors.lastName = "Invalid";
  }

  if (!values.superpower) {
    errors.superpower = "Required";
  } else if (!isValidName(values.superpower)) {
    errors.superpower = "Invalid";
  }

  if (!values.birthDay) {
    errors.birthDay = "Required";
  } else if (values.birthDay > 31 || values.birthDay < 1) {
    errors.birthDay = "Invalid";
  }

  if (!values.birthMonth) {
    errors.birthMonth = "Required";
  } else if (values.birthMonth > 12 || values.birthMonth < 1) {
    errors.birthMonth = "Invalid";
  }

  if (!values.birthYear) {
    errors.birthYear = "Required";
  } else if (values.birthYear < 0) {
    errors.birthYear = "Invalid";
  }

  if (errors.birthDay || errors.birthMonth || errors.birthYear) {
    errors.birth = "Incomplete";
  } else if (
    !isValidDate(values.birthYear, values.birthMonth, values.birthDay)
  ) {
    errors.birth = "Invalid";
    errors.birthDay = "Invalid";
    errors.birthMonth = "Invalid";
    errors.birthYear = "Invalid";
  }

  return errors;
};

export default validateAstronautForm;
