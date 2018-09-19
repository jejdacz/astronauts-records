import React from "react";
import { mount } from "enzyme";
import touchedHandler from "./touchedHandler.js";

const SampleForm = ({ handleBlur }) => (
  <form>
    <input
      type="text"
      name="firstName"
      onBlur={e => handleBlur(e)}
      value="John"
      onChange={e => e}
    />
    <input
      type="text"
      name="lastName"
      onBlur={e => handleBlur(e)}
      value="Doe"
      onChange={e => e}
    />
  </form>
);

const FormWithTouchedHandler = touchedHandler(SampleForm);

describe("component decorated with touchedHandler", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FormWithTouchedHandler />);
  });

  it("should have property handleBlur", () => {
    expect(wrapper.children()).toHaveProp("handleBlur");
  });

  it("should have property touched", () => {
    expect(wrapper.children()).toHaveProp("touched");
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
