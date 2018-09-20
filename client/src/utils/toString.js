const toString = input => {
  if (input !== null && input !== undefined) {
    if (typeof input.toString === "function") {
      return input.toString();
    }
  }
  return "";
};

export default toString;
