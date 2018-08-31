"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isValidName = exports.isValidName = function isValidName(w) {
  return (/^[A-Za-z-'. ]+$/.test(w.trim())
  );
};

var getLastDayOfMonth = exports.getLastDayOfMonth = function getLastDayOfMonth(year, month) {
  if (month === undefined || year === undefined) {
    throw new Error("undefined argument(s)");
  }

  month = parseInt(month);
  year = parseInt(year);

  if (month == NaN || year == NaN || month < 1 || month > 12) {
    throw new Error("bad arguments");
  }

  var isLeapYear = year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  var longMonths = [1, 3, 5, 7, 8, 10, 12];

  return longMonths.includes(month) ? 31 : month !== 2 ? 30 : isLeapYear ? 29 : 28;
};

var isValidDate = exports.isValidDate = function isValidDate(year, month, day) {
  if (day === undefined || month === undefined || year === undefined) {
    throw new Error("undefined argument(s)");
  }

  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);

  if (day == NaN || month == NaN || year == NaN || year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > getLastDayOfMonth(year, month)) {
    return false;
  }
  return true;
};

exports.default = { isValidName: isValidName, isValidDate: isValidDate };
