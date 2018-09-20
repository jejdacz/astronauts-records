const dateStringToObject = str => {
  if (typeof str !== "string")
    throw new TypeError(
      "Invalid argument, dateString has to be type of string."
    );

  if (!/\d{4}-\d{2}-\d{2}/.test(str))
    throw new Error("DateString has invalid format, use YYYY-MM-DD.");

  const dateArray = str.split("-");

  return { year: dateArray[0], month: dateArray[1], day: dateArray[2] };
};

export default dateStringToObject;
