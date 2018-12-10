import { mapProps } from "recompose";

const filterPropsForName = mapProps(
  ({
    formContext: { values, errors, touched, handleChange, handleBlur },
    name,
    ...props
  }) => ({
    name,
    handleChange,
    handleBlur,
    value: values[name],
    error: errors[name],
    touched: touched[name],
    ...props
  })
);

export default filterPropsForName;
