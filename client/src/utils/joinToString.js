import toString from "./toString.js";

export const joinToString = delimiter => (...values) =>
  values
    .map(a => toString(a).trim())
    .filter(a => a !== "")
    .join(delimiter);

export const joinToStringBySpace = joinToString(" ");

export default joinToString;
