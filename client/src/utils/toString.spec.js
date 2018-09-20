import toString from "./toString.js";

describe("toString(input)", () => {
  describe("when the input value is undefined", () => {
    it("should return an empty string", () => {
      expect(toString(undefined)).toEqual("");
    });
  });
  describe("when input value is null", () => {
    it("should return an empty string", () => {
      expect(toString(null)).toEqual("");
    });
  });
  describe("when input is not undefined or null", () => {
    describe("when input has property toString type of function", () => {
      it("should return result of toString call", () => {
        expect(toString(true)).toEqual("true"); //Boolean
        expect(toString(1)).toEqual("1"); //Number
        expect(toString("abc")).toEqual("abc"); //String
        expect(toString([1, 2, 3])).toEqual("1,2,3"); //Array
        expect(toString({})).toEqual("[object Object]"); //Object
        expect(toString(x => x)).toEqual("x => x"); //Function
      });
    });
  });
});
