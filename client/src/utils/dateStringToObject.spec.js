import dateStringToObject from "./dateStringToObject.js";

describe("dateStringToObject", () => {
  it("should be a function", () => {
    expect(typeof dateStringToObject).toEqual("function");
  });

  describe("when the string argument is not typeof string", () => {
    it("should throw an error", () => {
      expect(() => dateStringToObject()).toThrow();
    });
  });

  describe("when the string has invalid format", () => {
    it("should throw an error", () => {
      expect(() => dateStringToObject("2001-02-2")).toThrow();
    });
  });

  describe("when the string has valid format", () => {
    let date = { year: "2018", month: "09", day: "13" };
    let str = `${date.year}-${date.month}-${date.day}`;
    it("should return object with correct properties", () => {
      expect(dateStringToObject(str)).toEqual(date);
    });
  });
});
