import { withStateHandlers } from "recompose";

const changeHandler = withStateHandlers(
  ({ values = {} }) => ({
    values
  }),
  {
    handleChange: ({ values }) => ({ target: { name, value } }) => ({
      values: { ...values, [name]: value }
    })
  }
);

export default changeHandler;
