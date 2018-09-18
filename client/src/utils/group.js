import { curry } from "ramda";

export const group = curry((delimiter, values) =>
  values
    .filter(
      a => a !== undefined && a !== "" && a !== null && a.toString !== undefined
    )
    .map(a => a.toString())
    .map(a => (a.trim ? a.trim() : a))
    .join(delimiter)
);

export const grSp = group(" ");

export default group;
