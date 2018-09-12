import mapUntil from "./mapUntil.js";

describe("mapUntil(predicate, mapFunc, array)", () => {
  it("should be a function", () => {
    expect(typeof mapUntil).toEqual("function");
  });
  describe("when the predicate argument is not a function", () => {
    it("should throw an error", () => {
      expect(() => mapUntil("text", x => x, [1, 2, 3])).toThrow();
    });
  });
  describe("when the mapFunc argument is not a function", () => {
    it("should throw an error", () => {
      expect(() => mapUntil(() => true, "text", [1, 2, 3])).toThrow();
    });
  });
  describe("when the array argument is not an array", () => {
    it("should throw an error", () => {
      expect(() => mapUntil(() => true, x => x, "text")).toThrow();
    });
  });
  describe("when valid arguments provided", () => {
    it("should apply mapFunc on each array's element until predicate resolves to true", () => {
      expect(mapUntil(x => x > 7, x => x * 2, [1, 2, 3, 4, 5])).toEqual([
        2,
        4,
        6,
        8
      ]);
    });
    describe("when the array is empty", () => {
      it("should return an empty array", () => {
        expect(mapUntil(x => x > 7, x => x * 2, [])).toEqual([]);
      });
    });
    describe("when the predicate never resolves to true", () => {
      it("should apply mapFunc on each array's element", () => {
        expect(mapUntil(x => x > 20, x => x * 2, [1, 2, 3, 4, 5])).toEqual([
          2,
          4,
          6,
          8,
          10
        ]);
      });
    });
  });
});
