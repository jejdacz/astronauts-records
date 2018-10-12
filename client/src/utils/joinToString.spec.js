import { joinToStringBySpace as jstr, joinToString } from "./joinToString.js";

const values = [1, "a", null, "c", undefined];

describe("group(delimiter,values)", () => {
  it("should return string with values separated by a delimiter", () => {
    expect(joinToString(" ")(...values)).toEqual("1 a c");
    expect(jstr(...values)).toEqual("1 a c");
  });
});
