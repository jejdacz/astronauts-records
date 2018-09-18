import React from "react";
import { mount } from "enzyme";
import { showValidation } from "./hocForm.js";

const Sample = props => <div />;
const WithShowValid = showValidation({
  valid: "is-valid",
  invalid: "is-invalid"
})(Sample);

describe("component decorated with showValid", () => {
  describe("when prop touched is not defined", () => {
    it("should have only initial className", () => {
      expect(
        mount(<WithShowValid className="test" />).find("Sample")
      ).toHaveProp("className", "test");
    });
  });

  describe("when prop touched is defined", () => {
    describe("when error prop is undefined", () => {
      it("should have added className is-valid", () => {
        expect(
          mount(<WithShowValid className="test" touched={true} />).find(
            "Sample"
          )
        ).toHaveProp("className", "test is-valid");
      });
    });
    describe("when error prop is defined", () => {
      it("should have added className is-invalid", () => {
        expect(
          mount(
            <WithShowValid className="test" touched={true} error="error" />
          ).find("Sample")
        ).toHaveProp("className", "test is-invalid");
      });
    });
  });
});
