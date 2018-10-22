const ps00 = n => String(n).padStart(2, 0);

const formatDateObject = date =>
  `${date.getFullYear()}-${ps00(date.getMonth() + 1)}-${ps00(
    date.getDate()
  )} ${ps00(date.getHours())}:${ps00(date.getMinutes())}:${ps00(
    date.getSeconds()
  )}`;

const formatDate = input =>
  typeof input === "object"
    ? formatDateObject(input)
    : formatDateObject(new Date(input));

export default formatDate;
