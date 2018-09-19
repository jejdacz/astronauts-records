import { withHandlers } from "recompose";

const submitHandler = beforeSubmit =>
  withHandlers({
    handleSubmit: ({ onSubmit, values }) => () => onSubmit(beforeSubmit(values))
  });

export default submitHandler;
