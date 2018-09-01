let types = {};

const createAsyncRequestActionTypes = name => ({
  [`${name}_REQUEST`]: `${name}_REQUEST`,
  [`${name}_SUCCESS`]: `${name}_SECCESS`,
  [`${name}_FAIL`]: `${name}_FAIL`
});

types = { ...types, ...createAsyncRequestActionTypes("LOAD_ASTRONAUTS") };
types = { ...types, ...createAsyncRequestActionTypes("LOAD_ASTRONAUT") };

export default types;
