import { isValidDate, isValidName } from "input-validation";

export default values => {
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

  if (!values.birth) {
    errors.birth = "Required";
  } else if (!isValidDate(...values.birth.split("-"))) {
    errors.birth = "Invalid date";
  }

  if (Object.values(errors).length) {
    errors.form = "Invalid form";
  }

  return errors;
};
