import { isValidDate, isValidName } from "input-validation";

const validateAstronaut = values => {
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

  if (
    !values.birth ||
    values.birth.year === undefined ||
    values.birth.month === undefined ||
    values.birth.day === undefined
  ) {
    errors.birth = "Required";
  } else if (
    !isValidDate(values.birth.year, values.birth.month, values.birth.day)
  ) {
    errors.birth = "Invalid date";
  }

  if (Object.values(errors).length) {
    errors.form = "Invalid form";
  }

  return errors;
};

export default validateAstronaut;
