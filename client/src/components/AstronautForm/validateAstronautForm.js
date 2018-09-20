import { isValidDate, isValidName } from "input-validation";

const validateAstronautForm = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (!isValidName(values.firstName)) {
    errors.firstName = "Invalid first name";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (!isValidName(values.lastName)) {
    errors.lastName = "Invalid last name";
  }

  if (!values.superpower) {
    errors.superpower = "Required";
  } else if (!isValidName(values.superpower)) {
    errors.superpower = "Invalid superpower";
  }

  if (!values.birthDay) {
    errors.birthDay = "Required";
  } else if (values.birthDay > 31 || values.birthDay < 1) {
    errors.birthDay = "Invalid day";
  }

  if (!values.birthMonth) {
    errors.birthMonth = "Required";
  } else if (values.birthMonth > 12 || values.birthMonth < 1) {
    errors.birthMonth = "Invalid month";
  }

  if (!values.birthYear) {
    errors.birthYear = "Required";
  } else if (values.birthYear < 0) {
    errors.birthYear = "Invalid year";
  }

  if (errors.birthDay || errors.birthMonth || errors.birthYear) {
    errors.birth = "Invalid date";
  } else if (
    !isValidDate(values.birthYear, values.birthMonth, values.birthDay)
  ) {
    errors.birth = "Invalid date";
  }

  return errors;
};

export default validateAstronautForm;
