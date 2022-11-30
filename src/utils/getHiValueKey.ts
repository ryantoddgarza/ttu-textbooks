// Returns the largest value identifier given an object.

const getHiValueKey = (obj: Record<string, never>): string => {
  return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
};

export default getHiValueKey;
