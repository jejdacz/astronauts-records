import React from "react";
import { mount } from "enzyme";
import { validationHandler } from "./AstronautForm.js";

const SampleForm = props => <form />;

const FormWithValidation = validationHandler(x => x)(SampleForm);

describe("component decorated with validationHandler", () => {
  let wrapper;
  let values = { name: "value" };

  beforeEach(() => (wrapper = mount(<FormWithValidation values={values} />)));

  it("should process prop values and provide prop errors", () => {
    expect(wrapper.children()).toHaveProp("errors", values);
  });
});
