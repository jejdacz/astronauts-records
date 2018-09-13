import { curry } from "ramda";

const applyUntil = curry((predicate, mapFunc, arr) => {
  if (typeof predicate !== "function")
    throw new Error("Invalid argument, predicate has to be a function.");

  if (typeof mapFunc !== "function")
    throw new Error("Invalid argument, mapFunc has to be a function.");

  if (!Array.isArray(arr))
    throw new Error("Invalid argument, arr has to be an array.");

  if (arr.length === 0) return [];

  let result = [];
  let index = 0;

  do {
    result.push(mapFunc(arr[index]));
    index += 1;
  } while (arr.length > index && !predicate(result[index - 1]));

  return result;
});

export default applyUntil;
