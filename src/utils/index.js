export const isValidPollInputs = (...values) => {
  return !values[0].some((value) => value.length === 0);
};
