/**
 * Generates a random UUID using the built-in `crypto.randomUUID()` method.
 *
 * @returns {string} A randomly generated UUID as a string
 */
export const generateRandomUUID = (): string => {
  return crypto.randomUUID();
};
