import astronautsData from "../astronauts.json";

const wait = delay => data =>
  new Promise((res, err) => setTimeout(() => res(data), delay));

const wait2s = wait(2000);

const astronauts = variables => wait2s(astronautsData);

const astronaut = variables =>
  wait2s(astronautsData.find(a => a.id === variables.id));
const addAstronaut = variables => wait2s("added");
const updateAstronaut = variables => wait2s("updated");
const deleteAstronaut = variables => wait2s("deleted");
const lastUpdated = () => wait2s(Date.now());

export default {
  astronauts,
  astronaut,
  addAstronaut,
  updateAstronaut,
  deleteAstronaut,
  lastUpdated
};
