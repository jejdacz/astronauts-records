import astronautsData from "./astronauts.json";

const wait = delay => data =>
  new Promise((res, err) => setTimeout(() => res(data), delay));

const wait2s = wait(2000);

const astronauts = variables => wait2s(astronautsData);

const astronaut = () => {};
const addAstronaut = () => {};
const updateAstronaut = () => {};
const deleteAstronaut = () => {};
const lastUpdated = () => wait2s(Date.now());

export default {
  astronauts,
  astronaut,
  addAstronaut,
  updateAstronaut,
  deleteAstronaut,
  lastUpdated
};
