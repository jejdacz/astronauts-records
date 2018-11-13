import toString from "./toString.js";

export const joinCustom = delimiter => (...values) =>
  values
    .map(a => toString(a).trim())
    .filter(a => a !== "")
    .join(delimiter);

export const join = joinCustom(" ");

export default join;
