import React from "react";
import { mount } from "enzyme";
import { changeHandler } from "./hocForm.js";

const SampleForm = ({ handleChange }) => (
  <form>
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

const FormWithChangeHandler = changeHandler(SampleForm);

describe("component decorated with changeHandler", () => {
  let persist = "persist";
  let name1 = "input1";
  let name2 = "input2";
  let value1 = "textinput1";
  let value2 = "textinput2";
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FormWithChangeHandler />);
  });

  it("should have property handleChange", () => {
    expect(wrapper.children()).toHaveProp("handleChange");
  });

  describe("when field raise onChange event", () => {
    it("should change values to provided value for particular field name", () => {
      wrapper
        .children()
        .find('[name="firstName"]')
        .simulate("change", { target: { name: name1, value: value1 } });
      wrapper
        .children()
        .find('[name="lastName"]')
        .simulate("change", { target: { name: name2, value: value2 } });

      expect(wrapper).toHaveState("values", {
        [name1]: value1,
        [name2]: value2
      });
    });
    it("should let other parts of state unchanged", () => {
      wrapper.setState({ persist });
      wrapper
        .children()
        .find('[name="firstName"]')
        .simulate("change", { target: { name: name1, value: value1 } });
      expect(wrapper).toHaveState("persist", "persist");
    });
  });
});
