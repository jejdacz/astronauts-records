import React from "react";
import { mount } from "enzyme";
import { touchedHandler } from "./AstronautForm.js";

const SampleForm = ({ handleBlur }) => (
  <form>
    <input
      type="text"
      name="firstName"
      onBlur={e => handleBlur(e)}
      value="John"
    />
    <input
      type="text"
      name="lastName"
      onBlur={e => handleBlur(e)}
      value="Doe"
    />
  </form>
);

const FormWithtouchedHandler = touchedHandler(SampleForm);

describe("component decorated with touchedHandler", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FormWithtouchedHandler />);
  });

  it("should have property handleBlur", () => {
    expect(wrapper.children()).toHaveProp("handleBlur");
  });

  describe("when field raise onBlur event", () => {
    it("should change touched state to true for particular field name", () => {
      wrapper
        .children()
        .find('[name="lastName"]')
        .simulate("blur");
      wrapper
        .children()
        .find('[name="firstName"]')
        .simulate("blur");

      expect(wrapper).toHaveState("touched", {
        firstName: true,
        lastName: true
      });
    });
  });
});
