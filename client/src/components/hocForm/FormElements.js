import React, { Fragment } from "react";
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

export const Labeled = FieldComponent => ({ label, ...props }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <FieldComponent {...props} />
  </div>
);

export const InputWithValidation = renderValidation(Input);

export const InputFieldWithValidation = Labeled(props => (
  <Fragment>
    <InputWithValidation {...props} />
    {props.touched ? (
      props.error ? (
        <small className={join(styles.info, styles.small, styles.error)}>
          {props.error}
        </small>
      ) : (
        <small className={join(styles.info, styles.small, styles.success)}>
          OK
        </small>
      )
    ) : (
      <small className={styles.info} />
    )}
  </Fragment>
));

export const InlineFieldWithValidation = ({ desc, ...props }) => (
  <div>
    <InputWithValidation {...props} />
    {desc && <small className={styles.small}>{desc}</small>}
  </div>
);

InlineFieldWithValidation.propTypes = {
  desc: PropTypes.node,
  props: PropTypes.object
};
