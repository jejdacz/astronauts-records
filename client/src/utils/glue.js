import { curry } from "ramda";

export const glue = curry((delimiter, values) =>
  values
    .filter(
      a => a !== undefined && a !== "" && a !== null && a.toString !== undefined
    )
    .map(a => a.toString().trim())
    .join(delimiter)
);

export const gSp = glue(" ");

export default glue;
