import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { compose } from "recompose";
import {
  InputField,
  touchedHandler,
  changeHandler,
  submitHandler,
  validationHandler,
  contextProvider
} from "./hocForm.js";
import { traceProps, traceContext } from "./index.js";

const fields = [
  { name: "firstName", type: "text", label: "First name:" },
  { name: "lastName", type: "text", label: "Last name:" }
];

const values = {
  firstName: "John",
  lastName: "Doe2"
};

const SampleForm = ({ handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <InputField
      type={fields[0].type}
      name={fields[0].name}
      label={fields[0].label}
    />
    <InputField
      type={fields[1].type}
      name={fields[1].name}
      label={fields[1].label}
    />
  </form>
);

const HocForm = compose(
  touchedHandler,
  changeHandler,
  submitHandler(x => x),
  validationHandler(x => ({ [fields[1].name]: "Invalid name" })),
  contextProvider
)(SampleForm);

describe("Hoc Form", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<HocForm values={values} onSubmit={x => x} />);
  });

  it("should have two input fields", () => {
    wrapper
      .find("input")
      .find("[name='lastName']")
      .simulate("blur");
    //console.log(wrapper.html());
    expect(wrapper.find("input").length).toEqual(2);
  });
});