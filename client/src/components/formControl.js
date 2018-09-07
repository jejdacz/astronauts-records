import React, { Component } from "react";
import validateF from "../astronautValidation.js";

const GlobalContext = React.createContext(null);

const withValidation = validate => FormComponent => props => (
  <FormComponent errors={validate(props.values)} {...props} />
);

const formControl = FormComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        values: props.initValues,
        touched: {}
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState(prev => ({ values: { ...prev.values, [name]: value } }));
    }

    handleBlur(e) {
      const { name } = e.target;
      this.setState(prev => ({ touched: { ...prev.touched, [name]: true } }));
    }

    render() {
      return (
        <GlobalContext.Provider
          value={{
            values: this.state.values,
            touched: this.state.touched,
            errors: this.props.errors,
            onChange: this.handleChange,
            onBlur: this.handleBlur
          }}
        >
          <FormComponent {...this.props} />
        </GlobalContext.Provider>
      );
    }
  };
};

const hocForm = withValidation(validateF)(formControl);

export { GlobalContext };
export default hocForm;
