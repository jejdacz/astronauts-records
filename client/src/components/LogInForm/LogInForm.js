import React from "react";
import PropTypes from "prop-types";
import Field from "../hocForm/Field.js";
import touchedHandler from "../hocForm/touchedHandler.js";
import changeHandler from "../hocForm/changeHandler.js";
import submitHandler from "../hocForm/submitHandler.js";
import validationHandler from "../hocForm/validationHandler.js";
import contextProvider from "../hocForm/contextProvider.js";
import validate from "./validateLogInForm.js";
import { compose, mapProps } from "recompose";
import hasValues from "../../utils/hasValues.js";
import Button from "../Button/Button";
import { InputField } from "../FormElements/FormElements";
import styles from "../FormElements/FormElements.module.css";

export const LoginForm = ({ handleSubmit, errors, touched, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        autoFocus
        name="name"
        type="text"
        label="Name:"
        placeholder=""
        component={InputField}
      />
      <Field
        name="password"
        type="password"
        label="Password:"
        placeholder=""
        component={InputField}
      />
      <div className={styles.controls}>
        <Button
          noBorder
          type="submit"
          className={styles.button}
          disabled={submitting || hasValues(errors)}
        >
          submit
        </Button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  submitting: PropTypes.bool
};

export default compose(
  mapProps(({ values = { name: "", password: "" }, ...props }) => ({
    ...props,
    values
  })),
  touchedHandler,
  changeHandler,
  submitHandler(x => x),
  validationHandler(validate),
  contextProvider
)(LoginForm);
