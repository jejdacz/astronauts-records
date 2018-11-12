import { shouldLoadAstronauts } from "./astronautActions.js";

it("shouldLoadAstronauts is a function", () => {
  expect(typeof shouldLoadAstronauts).toEqual("function");
});

it("astrounats.items is empty => should load", () => {
  expect.assertions(1);
  return expect(
    shouldLoadAstronauts({ astronauts: { items: [] } }, () =>
      Promise.resolve(1)
    )
  ).resolves.toEqual(true);
});

it("astrounats.loading is true => shouldn't load", () => {
  expect.assertions(1);
  return expect(
    shouldLoadAstronauts(
      { astronauts: { items: [0, 1, 2], loading: true } },
      () => Promise.resolve(1)
    )
  ).resolves.toEqual(false);
});

it("astrounats.recievedAt < lastUpdated => should load", () => {
  expect.assertions(1);
  return expect(
    shouldLoadAstronauts(
      { astronauts: { items: [0, 1, 2], loading: false, receivedAt: 0 } },
      () => Promise.resolve(1)
    )
  ).resolves.toEqual(true);
});

it("astrounats.recievedAt = lastUpdated => shouldn't load", () => {
  expect.assertions(1);
  return expect(
    shouldLoadAstronauts(
      { astronauts: { items: [0, 1, 2], loading: false, receivedAt: 1 } },
      () => Promise.resolve(1)
    )
  ).resolves.toEqual(false);
});

it("loadAstronautsIfNeeded => shouldn't load", () => {
  const dispatch = val => Promise.resolve(val);
  expect.assertions(1);
  return expect(
    shouldLoadAstronauts(
      { astronauts: { items: [0, 1, 2], loading: false, receivedAt: 1 } },
      () => Promise.resolve(1)
    )
      .then(res => (res ? dispatch("success") : Promise.resolve("nothing")))
      .catch(err => dispatch("error"))
  ).resolves.toEqual("nothing");
});
