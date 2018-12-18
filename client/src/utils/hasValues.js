const hasValue = obj =>
  typeof obj === "object" ? !!Object.values(obj).length : false;

export default hasValue;
