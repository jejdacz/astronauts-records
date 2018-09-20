const objectToDateString = d => {
  if (typeof d !== "object")
    throw new TypeError("Invalid type of argument, use object.");

  if (d.day === undefined || d.month === undefined || d.year === undefined)
    throw new Error("Object has undefined value(s).");

  const str = `${d.year.padStart(4, "0")}-${d.month.padStart(
    2,
    "0"
  )}-${d.day.padStart(2, "0")}`;

  if (!/\d{4}-\d{2}-\d{2}/.test(str))
    throw new Error("DateString has invalid format, use YYYY-MM-DD.");

  return str;
};

export default objectToDateString;
