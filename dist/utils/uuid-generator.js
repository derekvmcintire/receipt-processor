'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateRandomUUID = void 0;
/**
 * Generates a random UUID using the built-in `crypto.randomUUID()` method.
 *
 * @returns {string} A randomly generated UUID as a string
 */
const generateRandomUUID = () => {
  return crypto.randomUUID();
};
exports.generateRandomUUID = generateRandomUUID;
