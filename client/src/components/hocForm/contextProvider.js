import PropTypes from "prop-types";
import { withContext } from "recompose";

const contextProvider = withContext(
  { formContext: PropTypes.object },
  ({ values, errors, touched, handleChange, handleBlur }) => ({
    formContext: {
      values,
      errors,
      touched,
      handleChange,
      handleBlur
    }
  })
);

export default contextProvider;
