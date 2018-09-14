import React from "react";
import { mount } from "enzyme";
import { submitHandler } from "./AstronautForm.js";

const SampleForm = ({ handleChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      name="firstName"
      onChange={e => handleChange(e)}
      value="John"
    />
    <input
      type="text"
      name="lastName"
      onChange={e => handleChange(e)}
      value="Doe"
    />
  </form>
);
const onSubmitMock = jest.fn();
const beforeSubmitMock = jest.fn();

const FormWithSubmitHandler = submitHandler(beforeSubmitMock)(SampleForm);

describe("component decorated with submitHandler", () => {
  let wrapper;
  let values = { name: "John", birth: "1955-05-01" };

  beforeEach(() => {
    wrapper = mount(
      <FormWithSubmitHandler values={values} onSubmit={onSubmitMock} />
    );
  });

  afterEach(() => {
    onSubmitMock.mockClear();
    beforeSubmitMock.mockClear();
  });

  it("should have property onSubmit", () => {
    expect(wrapper.children()).toHaveProp("onSubmit");
  });

  it("should have property values", () => {
    expect(wrapper.children()).toHaveProp("values", values);
  });

  describe("when form raise submit event", () => {
    it("should call onSubmit function", () => {
      expect(onSubmitMock.mock.calls.length).toEqual(0);

      wrapper.simulate("submit");

      expect(onSubmitMock.mock.calls.length).toEqual(1);
    });
    it("should call beforeSubmit function", () => {
      wrapper.simulate("submit");

      expect(beforeSubmitMock.mock.calls.length).toEqual(1);
    });
  });
});
