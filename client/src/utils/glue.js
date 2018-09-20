import { curry } from "ramda";
import toString from "./toString.js";

export const glue = curry((delimiter, values) =>
  values
    .map(a => toString(a).trim())
    .filter(a => a !== "")
    .join(delimiter)
);

export const glueSpace = glue(" ");

export default glue;
