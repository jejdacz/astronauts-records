import React from "react";
import PropTypes from "prop-types";
import renderValidation from "../hocForm/renderValidation.js";
import join from "../../utils/join.js";
import styles from "./FormElements.module.css";

export const Input = ({
  handleChange,
  handleBlur,
  touched,
  error,
  className,
  ...input
}) => (
  <input
    className={join(styles.input, className)}
    {...input}
    onChange={handleChange}
    onBlur={handleBlur}
  />
);

Input.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.bool,
  className: PropTypes.string,
  input: PropTypes.object
};

export const InputWithValidation = renderValidation({
  valid: "is-valid",
  invalid: "is-invalid"
})(Input);

export const InputField = ({ label, ...input }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <InputWithValidation {...input} />
    {input.touched ? (
      input.error ? (
        <small className={join(styles.info, styles.small, styles.error)}>
          {input.error}
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
);

InputField.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object
};

export const InlineField = ({ desc, ...props }) => (
  <div>
    <InputWithValidation {...props} />
    {desc && <small className={styles.small}>{desc}</small>}
  </div>
);

InlineField.propTypes = {
  desc: PropTypes.node,
  props: PropTypes.object
};
