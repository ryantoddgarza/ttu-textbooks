// Returns an object with instances of values given an array.

const instancesIn = (arr: (string | number)[]): Record<string, never> => {
  return arr.reduce((all, curr) => {
    const currCount = all[curr] ?? 0;
    return {
      ...all,
      [curr]: currCount + 1,
    };
  }, {});
};

export default instancesIn;
