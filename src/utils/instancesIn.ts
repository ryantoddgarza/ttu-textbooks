// Returns an object with instances of values given an array.

const instancesIn = (
  arr: (string | number)[],
  check?: string[]
): Record<string, never> => {
  return arr.reduce((all, curr) => {
    let currCount = all[curr] ?? 0;

    // Instance(s) from string(s) in check array
    if (check && typeof curr === 'string') {
      const found = {};

      for (const str of check) {
        if (curr.includes(str)) {
          currCount = all[str] ?? 0;
          found[str] = currCount + 1;
        }
      }

      return {
        ...all,
        ...found,
      };
    }

    return {
      ...all,
      [curr]: currCount + 1,
    };
  }, {});
};

export default instancesIn;
