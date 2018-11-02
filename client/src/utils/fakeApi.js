import astronautsData from "../astronauts.json";

const wait = delay => data =>
  new Promise((res, err) => setTimeout(() => res(data), delay));

const waitErr = delay => data =>
  new Promise((res, err) => setTimeout(() => err(data), delay));

const wait2s = wait(2000);
const waitErr2s = waitErr(2000);

const astronauts = variables => wait2s(astronautsData);

const astronaut = variables =>
  wait2s(astronautsData.find(a => a.id === variables.id));
const addAstronaut = variables => wait2s({ ...variables, id: "dkd411" });
const updateAstronaut = variables => wait2s(variables);
const deleteAstronaut = variables =>
  wait2s(astronautsData.find(a => a.id === variables.id));
const lastUpdated = () => wait2s(1);

export default {
  astronauts,
  astronaut,
  addAstronaut,
  updateAstronaut,
  deleteAstronaut,
  lastUpdated
};