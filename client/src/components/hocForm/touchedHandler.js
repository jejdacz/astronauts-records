import { withStateHandlers } from "recompose";

const touchedHandler = withStateHandlers(
  () => ({
    touched: {}
  }),
  {
    handleBlur: ({ touched }) => ({ target: { name } }) => ({
      touched: { ...touched, [name]: true }
    })
  }
);

export default touchedHandler;
