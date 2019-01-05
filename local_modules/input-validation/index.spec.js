import { expect } from "chai";
import { isValidName, isValidDate } from "./src.js";

describe("input validator test", () => {
  it("should refuse single space character", () => {
    const str = " ";
    expect(isValidName(str)).to.equal(false);
  });
  it("should accept name Will-B J. O'Smith", () => {
    const str = "Will-B J. O'Smith";
    expect(isValidName(str)).to.equal(true);
  });
  it("should refuse name Will 1 J. O'Smith", () => {
    const str = "Will 1 J. O'Smith";
    expect(isValidName(str)).to.equal(false);
  });
  it("should refuse name Will + J. O'Smith", () => {
    const str = "Will + J. O'Smith";
    expect(isValidName(str)).to.equal(false);
  });
  it("should throw error on missing arguments", () => {
    expect(() => isValidDate(1900, 2)).to.throw();
  });
  it("should refuse date 1900-02-29, 1900 is not a leap year", () => {
    expect(isValidDate(1900, 2, 29)).to.equal(false);
  });
  it("should accept date 2000-02-29, 2000 is a leap year", () => {
    expect(isValidDate(2000, 2, 29)).to.equal(true);
  });
  it("should refuse date 1900-13-20", () => {
    expect(isValidDate(1900, 13, 20)).to.equal(false);
  });
});
