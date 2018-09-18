import React, { Component } from "react";

const GlobalContext = React.createContext(null);

const hocForm = options => FormComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = options || { validate: x => x };
      const errors = this.options.validate(props.initValues);

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
            errors: this.options.validate(this.state.values),
            onChange: this.handleChange,
            onBlur: this.handleBlur
          }}
        >
          <FormComponent
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            values={this.state.values}
            errors={this.options.validate(this.state.values)}
            touched={this.state.touched}
            {...this.props}
          />
        </GlobalContext.Provider>
      );
    }
  };
};
export { GlobalContext };
export default hocForm;
