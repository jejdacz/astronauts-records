import toString from "./toString.js";

export const glue = delimiter => (...values) =>
  values
    .map(a => toString(a).trim())
    .filter(a => a !== "")
    .join(delimiter);

export const glueSpace = glue(" ");

export default glue;
