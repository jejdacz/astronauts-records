import { group, grSp } from "./group.js";

const values = [1, "a", null, "c", undefined];

describe("group(delimiter,values)", () => {
  it("should return string with values separated by a delimiter", () => {
    expect(group(" ")(values)).toEqual("1 a c");
    expect(group(" ", values)).toEqual("1 a c");
    expect(grSp(values)).toEqual("1 a c");
  });
});
