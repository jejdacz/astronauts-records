import React from "react";
import PropTypes from "prop-types";
import Field from "../hocForm/Field.js";
import touchedHandler from "../hocForm/touchedHandler.js";
import changeHandler from "../hocForm/changeHandler.js";
import submitHandler from "../hocForm/submitHandler.js";
import validationHandler from "../hocForm/validationHandler.js";
import contextProvider from "../hocForm/contextProvider.js";
import validate from "./validateAstronautForm.js";
import { compose, mapProps } from "recompose";
import hasValues from "../../utils/hasValues.js";
import dateStringToObject from "../../utils/dateStringToObject.js";
import objectToDateString from "../../utils/objectToDateString.js";
import join from "../../utils/join.js";
import Button from "../Button/Button";
import { InputField, InlineField } from "../FormElements/FormElements";
import styles from "../FormElements/FormElements.module.css";

export const AstronautForm = ({
  handleSubmit,
  errors,
  touched,
  submitting
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        autoFocus
        name="firstName"
        type="text"
        label="First Name:"
        placeholder="John"
        component={InputField}
      />
      <Field
        name="lastName"
        type="text"
        label="Last Name:"
        placeholder="Doe"
        component={InputField}
      />
      <div className={styles.field}>
        <label className={styles.label}>Birth:</label>
        <div className={styles.inlineFieldsContainer}>
          <Field
            name="birthDay"
            type="number"
            desc="day"
            placeholder="D"
            min="1"
            max="31"
            component={InlineField}
          />
          <Field
            name="birthMonth"
            type="number"
            desc="month"
            placeholder="M"
            min="1"
            max="12"
            component={InlineField}
          />
          <Field
            name="birthYear"
            type="number"
            desc="year"
            placeholder="Y"
            min="0"
            component={InlineField}
          />
        </div>
        {touched.birthDay || touched.birthMonth || touched.birthYear ? (
          errors.birth ? (
            <small className={join(styles.info, styles.small, styles.error)}>
              {errors.birth}
            </small>
          ) : (
            <small className={join(styles.info, styles.small, styles.success)}>
              OK
            </small>
          )
        ) : (
          <small className={styles.info} />
        )}
      </div>
      <Field
        name="superpower"
        type="text"
        label="Superpower:"
        placeholder="superpower"
        component={InputField}
      />
      <div className={styles.controls}>
        <Button
          noBorder={true}
          type="submit"
          className={styles.button}
          disabled={submitting || hasValues(errors)}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

AstronautForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  submitting: PropTypes.bool
};

const initValues = values => {
  if (values) {
    const date = dateStringToObject(values.birth);
    const birthDate = {
      birthDay: date.day,
      birthMonth: date.month,
      birthYear: date.year
    };
    const { birth, ...rest } = values;
    return { ...rest, ...birthDate };
  } else {
    return {
      firstName: "",
      lastName: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      superpower: ""
    };
  }
};

const formatBirth = values => {
  const { birthDay, birthMonth, birthYear, ...rest } = values;
  return {
    ...rest,
    birth: objectToDateString({
      day: birthDay,
      month: birthMonth,
      year: birthYear
    })
  };
};

export default compose(
  mapProps(({ values, ...props }) => ({
    ...props,
    values: initValues(values)
  })),
  touchedHandler,
  changeHandler,
  submitHandler(formatBirth),
  validationHandler(validate),
  contextProvider
)(AstronautForm);
