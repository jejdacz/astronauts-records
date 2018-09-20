import React from "react";
import { mount } from "enzyme";
import AstronautForm from "./AstronautForm.js";
import faker from "faker";

describe("AstronautForm", () => {
  const initValues = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birth: "2018-09-20",
    superpower: faker.random.word()
  };

  const handleSubmit = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <AstronautForm values={initValues} onSubmit={handleSubmit} />
    );
  });

  afterEach(() => {
    handleSubmit.mockClear();
  });

  it("field firstName should have correct initial value", () => {
    /*
    console.log(wrapper.html());
    console.log(
      wrapper
        .find("input")
        .find("[name='firstName']")
        .prop("value")
    );*/

    expect(
      wrapper
        .find("input")
        .find("[name='firstName']")
        .prop("value")
    ).toEqual(initValues.firstName);
  });

  it("field lastName should have correct initial value", () => {
    expect(
      wrapper
        .find("input")
        .find("[name='lastName']")
        .prop("value")
    ).toEqual(initValues.lastName);
  });

  it("field superpower should have correct initial value", () => {
    expect(
      wrapper
        .find("input")
        .find("[name='superpower']")
        .prop("value")
    ).toEqual(initValues.superpower);
  });

  it("field birthDay should have correct initial value", () => {
    expect(
      wrapper
        .find("input")
        .find("[name='birthDay']")
        .prop("value")
    ).toEqual(initValues.birth.split("-")[2]);
  });

  it("field birthMonth should have correct initial value", () => {
    expect(
      wrapper
        .find("input")
        .find("[name='birthMonth']")
        .prop("value")
    ).toEqual(initValues.birth.split("-")[1]);
  });

  it("field birthYear should have correct initial value", () => {
    expect(
      wrapper
        .find("input")
        .find("[name='birthYear']")
        .prop("value")
    ).toEqual(initValues.birth.split("-")[0]);
  });

  describe("when it has all fields with valid values", () => {
    it("should have submit button enabled", () => {
      expect(wrapper.find("button").find("[type='submit']")).toHaveProp(
        "disabled",
        false
      );
    });
    describe("when prop submitting is true", () => {
      it("should have the submit button disabled", () => {
        wrapper.setProps({ values: initValues, submitting: true });
        expect(wrapper.find("button").find("[type='submit']")).toHaveProp(
          "disabled",
          true
        );
      });
    });
    describe("when it is submitted", () => {
      it("should pass values to function passed via onSubmit prop", () => {
        wrapper.find("form").simulate("submit");
        expect(handleSubmit.mock.calls.length).toEqual(1);
        expect(handleSubmit.mock.calls[0][0]).toEqual(initValues);
      });
    });
  });

  describe("when it has any field with invalid value", () => {
    it("should have the submit button disabled", () => {
      wrapper
        .find("input")
        .find("[name='firstName']")
        .simulate("change", { target: { name: "firstName", value: "John22" } });
      expect(wrapper.find("button").find("[type='submit']")).toHaveProp(
        "disabled",
        true
      );
    });
  });
});
