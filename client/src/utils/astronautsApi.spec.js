import api, {
  authorizeRequest,
  requestBody,
  queryLogin,
  queryLastUpdated,
  getAuth,
  requestBase,
  url,
  login,
  logout,
  request
} from "./astronautsApi.js";
import { mergeDeepRight, mergeRight, lensPath, set } from "ramda";

const credentials = { name: "astronaut", password: "universe" };

describe("authorizeRequest", () => {
  const getAuthLocal = () => "welcome";
  const authHeader = { headers: { Authorization: getAuthLocal() } };
  const result = mergeDeepRight(requestBase, authHeader);
  it("should return merged auth and request", () => {
    expect(authorizeRequest(getAuthLocal)({})).toEqual(authHeader);
    expect(authorizeRequest(getAuthLocal)(requestBase)).toEqual(result);
  });
});

describe("requestBody", () => {
  it("should return request body", () => {
    expect(requestBody(queryLogin, credentials)).toEqual({
      body: JSON.stringify({ query: queryLogin, variables: credentials })
    });
    expect(requestBody(queryLogin)).toEqual({
      body: JSON.stringify({ query: queryLogin })
    });
  });
});

describe("when not authorized", () => {
  beforeEach(() => api.logout());

  describe("when call authorized route", () => {
    it("should return status 401", () => {
      expect.assertions(1);
      const response = fetch(
        url,
        authorizeRequest(getAuth)(
          mergeRight(requestBase, requestBody(queryLastUpdated))
        )
      );
      return response.then(r => expect(r.status).toEqual(401));
    });

    it("should return error", () => {
      expect.assertions(1);
      return expect(api.lastUpdated()).rejects.toThrow();
    });
  });

  describe("api login", () => {
    describe("when login with correct credentials", () => {
      it("should return status 200", () => {
        expect.assertions(1);
        const response = fetch(
          url,
          mergeRight(requestBase, requestBody(queryLogin, credentials))
        );
        return response.then(r => expect(r.status).toEqual(200));
      });

      it("should return jwt", () => {
        expect.assertions(1);
        return api.login(credentials).then(r => expect(r.length).toEqual(169));
      });
    });
  });
});

describe("when authorized", () => {
  beforeEach(() => api.login(credentials));

  it("should return status 200 on authorized route", () => {
    expect.assertions(1);
    const response = fetch(
      url,
      authorizeRequest(getAuth)(
        mergeRight(requestBase, requestBody(queryLastUpdated))
      )
    );
    return response.then(r => expect(r.status).toEqual(200));
  });

  it("should reach authorized route", () => {
    expect.assertions(1);
    return expect(api.lastUpdated()).resolves.not.toThrow();
  });
});
