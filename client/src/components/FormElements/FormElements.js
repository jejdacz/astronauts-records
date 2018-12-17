import React from "react";
import PropTypes from "prop-types";
import Field from "../hocForm/Field.js";
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

export const InlineField = ({ desc, ...props }) => (
  <div>
    <InputWithValidation {...props} />
    {desc && <small className={styles.small}>{desc}</small>}
  </div>
);
