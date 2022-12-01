// Mutates the source key of the given object.

const renameKey = (
  obj: Record<string, never>,
  oldKey: string,
  newKey: string
): void => {
  delete Object.assign(obj, {
    [newKey]: obj[oldKey],
  })[oldKey];
};

export default renameKey;
