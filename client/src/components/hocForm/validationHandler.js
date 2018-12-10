import { withProps } from "recompose";

const validationHandler = validate =>
  withProps(({ values }) => ({
    errors: validate(values)
  }));

export default validationHandler;
