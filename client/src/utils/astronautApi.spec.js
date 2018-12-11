import { buildBody } from "./astronautsApi.js";

const query = `query me {me{name}}`;
const variables = { name: "Neil", password: "Armstrong" };

describe("when input parameter is provided", () => {
  it("should be set as variables property", () => {
    expect(buildBody(query)(variables)).toEqual({
      body: JSON.stringify({ query, variables })
    });
  });
});
