export function assoc(key, value) {
  return obj => ({
    ...obj,
    [key]: value,
  });
}

export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15);

export const generateId = obj => assoc("id", generateRandomString())(obj);
