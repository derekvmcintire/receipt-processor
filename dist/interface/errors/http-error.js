'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HTTPError = void 0;
/**
 * Custom error class to represent HTTP-specific errors.
 * Extends the built-in `Error` class and adds an additional
 * `statusCode` property
 */
class HTTPError extends Error {
  /**
   * Creates an instance of HTTPError.
   * @param {string} message - The error message to describe the error.
   * @param {ErrorStatusCode} statusCode - The HTTP status code that should be returned with the error.
   *
   * Call the base `Error` class constructor with the provided message.
   * Set the `statusCode` to the value provided.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Set the prototype explicitly to maintain the correct prototype chain for instanceof
    // We need to do this because we call super() in the constructor and we want to be able to
    // check for instanceOf HTTPError later on
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
exports.HTTPError = HTTPError;
