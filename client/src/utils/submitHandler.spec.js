import React from "react";
import { mount } from "enzyme";
import { submitHandler } from "./hocForm.js";

const SampleForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input type="text" name="firstName" onChange={e => e} value="John" />
    <input type="text" name="lastName" onChange={e => e} value="Doe" />
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
      <FormWithSubmitHandler values={values} onSubmit={x => x} />
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

  describe("on submit event", () => {
    it("should call beforeSubmit function", () => {
      wrapper.simulate("submit");
      expect(beforeSubmitMock.mock.calls[0][0]).toEqual(values);
    });
    it("should pass values to beforeSubmit function", () => {
      wrapper.simulate("submit");
      expect(beforeSubmitMock.mock.calls[0][0]).toEqual(values);
    });
  });
});
