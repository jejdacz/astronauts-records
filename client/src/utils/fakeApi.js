import astronautsData from "../astronauts.json";

const wait = delay => data =>
  new Promise((res, err) => setTimeout(() => res(data), delay));

const waitErr = delay => data =>
  new Promise((res, err) => setTimeout(() => err(data), delay));

const wait2s = wait(2000);
const waitErr2s = waitErr(2000);

const astronauts = variables => wait2s(astronautsData);
//const astronauts = variables => waitErr2s("load error");

const astronaut = variables =>
  wait2s(astronautsData.find(a => a.id === variables.id));
const addAstronaut = variables => wait2s({ ...variables, id: "dkd411" });
const updateAstronaut = variables => wait2s(variables);
const deleteAstronaut = variables =>
  wait2s(astronautsData.find(a => a.id === variables.id));
const lastUpdated = () => wait2s(1);
const login = variables =>
  wait2s(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiYXN0cm9uYXV0IiwiaWF0IjoxNTQ0NDY0NTk2LCJleHAiOjE1NzYwMjIxOTZ9.h87xq84BBUaMylS6Ey08lg0rOP_9rTbnxbC7T_UB2-c"
  );
const me = variables =>
  wait2s(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiYXN0cm9uYXV0IiwiaWF0IjoxNTQ0NDY0NTk2LCJleHAiOjE1NzYwMjIxOTZ9.h87xq84BBUaMylS6Ey08lg0rOP_9rTbnxbC7T_UB2-c"
  );
const logout = () => wait2s();

export default {
  astronauts,
  astronaut,
  addAstronaut,
  updateAstronaut,
  deleteAstronaut,
  lastUpdated,
  login,
  logout,
  me
};
