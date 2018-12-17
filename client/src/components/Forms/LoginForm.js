import React from "react";
import PropTypes from "prop-types";
import Field from "../hocForm/Field.js";
import renderValidation from "../hocForm/renderValidation.js";
import touchedHandler from "../hocForm/touchedHandler.js";
import changeHandler from "../hocForm/changeHandler.js";
import submitHandler from "../hocForm/submitHandler.js";
import validationHandler from "../hocForm/validationHandler.js";
import contextProvider from "../hocForm/contextProvider.js";
import validate from "./validateLoginForm.js";
import { compose, mapProps } from "recompose";
import hasValues from "../../utils/hasValues.js";
import dateStringToObject from "../../utils/dateStringToObject.js";
import objectToDateString from "../../utils/objectToDateString.js";
import join from "../../utils/join.js";
import Button from "../Button/Button";
import {
  Input,
  InputField,
  InputWithValidation,
  InlineField
} from "./Elements";
import styles from "./Elements.module.css";

export const LoginForm = ({ handleSubmit, errors, touched, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
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
          noBorder={true}
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
  touchedHandler,
  changeHandler,
  submitHandler(x => x),
  validationHandler(validate),
  contextProvider
)(LoginForm);
