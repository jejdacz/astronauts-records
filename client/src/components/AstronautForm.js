import React, { Component } from "react";
import PropTypes from "prop-types";
import InputDate from "./InputDate.js";
import validate from "../astronautValidation.js";
/*
values: {
  firstName: "",
  lastName: "",
  birth: { year: "", month: "", day: "" },
  superpower: ""
},*/

const createForm = options => FormComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = options;
      this.state = {
        values: props.values,
        touched: {}
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(field) {
      this.setState(prev => ({ values: { ...prev.values, ...field } }));
    }

    handleBlur(field) {
      this.setState(prev => ({ touched: { ...prev.touched, ...field } }));
    }

    render() {
      return (
        <FormComponent
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          values={this.state.values}
          errors={this.options.validate(this.state.values)}
          touched={this.state.touched}
          {...this.props}
        />
      );
    }
  };
};

function AstronautForm({
  onChange,
  onBlur,
  onSubmit,
  values,
  touched,
  errors,
  submitting
}) {
  const handleChange = e => {
    let { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleBlur = e => {
    let { name, value } = e.target;
    onBlur({ [name]: true });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John"
            className={`form-control ${touched.firstName &&
              (errors.firstName ? "is-invalid" : "is-valid")}`}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Doe"
            className={`form-control ${touched.lastName &&
              (errors.lastName ? "is-invalid" : "is-valid")}`}
          />
        </div>
        <InputDate
          label="Birth:"
          date={values.birth}
          /*TODO unify onChange, onBlur methods or hide element into unified component aka FIELD*/
          onChange={obj => onChange({ birth: obj })}
          onBlur={() => onBlur({ birth: true })}
          className={
            touched.birth && (errors.birth ? "is-invalid" : "is-valid")
          }
        />
        <div className="form-group">
          <label>Superpower:</label>
          <input
            name="superpower"
            type="text"
            value={values.superpower}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="super-strength"
            className={`form-control ${touched.superpower &&
              (errors.superpower ? "is-invalid" : "is-valid")}`}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || errors.form}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default createForm({ validate })(AstronautForm);
/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
