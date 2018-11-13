import join, { joinCustom } from "./join.js";

const values = [1, "a", null, "c", undefined];

describe("group(delimiter,values)", () => {
  it("should return string with values separated by a delimiter", () => {
    expect(joinCustom("-")(...values)).toEqual("1-a-c");
    expect(join(...values)).toEqual("1 a c");
  });
});
