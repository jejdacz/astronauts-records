import { glue, glueSpace as gSp } from "./glueString.js";

const values = [1, "a", null, "c", undefined];

describe("group(delimiter,values)", () => {
  it("should return string with values separated by a delimiter", () => {
    expect(glue(" ")(...values)).toEqual("1 a c");
    expect(gSp(...values)).toEqual("1 a c");
  });
});
