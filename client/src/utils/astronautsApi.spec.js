import { ApiFetch, requestBase, requestBody } from "./astronautsApi.js";
import { mergeDeepRight } from "ramda";

const query = `query me {me{name}}`;
const variables = { name: "Neil", password: "Armstrong" };
const getAuth = () => "authorized";
const rb = mergeDeepRight(requestBase, {
  body: JSON.stringify({ query, variables })
});
const ra = mergeDeepRight({ headers: { Authorization: getAuth() } }, rb);
const fetcher = url => request => Promise.resolve(request);

describe("ApiFetch", () => {
  it("should return correct response", () => {
    expect.assertions(1);
    return expect(
      ApiFetch(fetcher, getAuth).base(query)(variables)
    ).resolves.toEqual(rb);
  });

  it("should return correct response", () => {
    expect.assertions(1);
    return expect(
      ApiFetch(fetcher, getAuth).auth(query)(variables)
    ).resolves.toEqual(ra);
  });
});
