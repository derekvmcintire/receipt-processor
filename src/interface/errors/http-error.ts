type ErrorStatusCode = 400 | 401 | 403 | 404 | 500 | 502 | 503 | 504;

/**
 * Custom error class to represent HTTP-specific errors.
 * Extends the built-in `Error` class and adds an additional
 * `statusCode` property
 */
export class HTTPError extends Error {
  statusCode: ErrorStatusCode;

  /**
   * Creates an instance of HTTPError.
   * @param {string} message - The error message to describe the error.
   * @param {ErrorStatusCode} statusCode - The HTTP status code that should be returned with the error.
   *
   * Call the base `Error` class constructor with the provided message.
   * Set the `statusCode` to the value provided.
   */
  constructor(message: string, statusCode: ErrorStatusCode) {
    super(message);

    this.statusCode = statusCode;

    // Set the prototype explicitly to maintain the correct prototype chain for instanceof
    // We need to do this because we call super() in the constructor and we want to be able to
    // check for instanceOf HTTPError later on
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
