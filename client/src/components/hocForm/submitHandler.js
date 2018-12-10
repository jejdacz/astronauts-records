import { withHandlers } from "recompose";

const submitHandler = beforeSubmit =>
  withHandlers({
    handleSubmit: ({ onSubmit, values }) => e => {
      e.preventDefault();
      onSubmit(beforeSubmit(values));
    }
  });

export default submitHandler;
