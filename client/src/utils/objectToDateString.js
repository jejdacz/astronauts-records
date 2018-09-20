const objectToDateString = d =>
  `${d.year.padStart(4, "0")}-${d.month.padStart(2, "0")}-${d.day.padStart(
    2,
    "0"
  )}`;

export default objectToDateString;
