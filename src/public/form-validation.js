export const isValidWord = w => /^[A-Za-z]+$/.test(w);

export const getLastDayOfMonth = (year, month) => {
  if (month === undefined || year === undefined) {
    throw new Error("undefined argument(s)");
  }

  month = parseInt(month);
  year = parseInt(year);

  if (month == NaN || year == NaN || month < 1 || month > 12) {
    throw new Error("bad arguments");
  }

  const isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  const longMonths = [1, 3, 5, 7, 8, 10, 12];

  return longMonths.includes(month)
    ? 31
    : month !== 2
      ? 30
      : isLeapYear
        ? 29
        : 28;
};

export const isValidDate = (year, month, day) => {
  if (day === undefined || month === undefined || year === undefined) {
    throw new Error("undefined argument(s)");
  }

  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);

  if (
    day == NaN ||
    month == NaN ||
    year == NaN ||
    year < 0 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getLastDayOfMonth(year, month)
  ) {
    return false;
  }
  return true;
};
