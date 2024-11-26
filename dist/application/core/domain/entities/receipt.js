'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReceiptEntity = void 0;
const http_error_1 = require('../../../../interface/errors/http-error');
const uuid_generator_1 = require('../../../../utils/uuid-generator');
/**
 * Represents a Receipt entity in the domain layer.
 * This class encapsulates the core properties and behaviors of a receipt,
 * including validation logic to ensure data integrity.
 */
class ReceiptEntity {
  constructor(data, generateUUID = uuid_generator_1.generateRandomUUID) {
    this.id = data.id ?? generateUUID(); // Use provided ID or generate a new one
    this.retailer = data.retailer;
    this.purchaseDate = data.purchaseDate;
    this.purchaseTime = data.purchaseTime;
    this.items = data.items;
    this.total = data.total;
    this.validate();
  }
  /**
   * Main validation method that calls individual validation functions.
   */
  validate() {
    this.validateRequiredFields();
    this.validateTotal();
    this.validateItems();
    this.validateDateAndTimeFormats();
  }
  /**
   * Validates that all required fields are provided.
   * Throws an HTTPError if any required field is missing.
   */
  validateRequiredFields() {
    if (
      !this.retailer.trim() ||
      !this.purchaseDate.trim() ||
      !this.purchaseTime.trim() ||
      !this.items ||
      !this.total.trim()
    ) {
      throw new http_error_1.HTTPError(
        'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
        400
      );
    }
  }
  /**
   * Validates that the total matches the sum of the item prices.
   * Throws an HTTPError if the total does not match the sum of item prices.
   */
  validateTotal() {
    const calculatedTotal = this.items.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    const parsedTotal = parseFloat(this.total);
    const roundedCalculatedTotal = Math.round(calculatedTotal * 100) / 100;
    const roundedParsedTotal = Math.round(parsedTotal * 100) / 100;
    if (roundedParsedTotal !== roundedCalculatedTotal) {
      throw new http_error_1.HTTPError(
        `The total (${this.total}) does not match the sum of item prices.`,
        400
      );
    }
  }
  /**
   * Validates that the items array is not empty and each item has valid properties.
   * Throws an HTTPError if the items array is empty or any item is invalid.
   */
  validateItems() {
    if (!Array.isArray(this.items) || this.items.length === 0) {
      throw new http_error_1.HTTPError('Items must be a non-empty array.', 400);
    }
    this.items.forEach((item, index) => {
      if (!item.shortDescription || typeof item.shortDescription !== 'string') {
        throw new http_error_1.HTTPError(
          `Item at index ${index} is missing a valid 'shortDescription'.`,
          400
        );
      }
      if (!item.price || isNaN(parseFloat(item.price))) {
        throw new http_error_1.HTTPError(
          `Item at index ${index} has an invalid 'price'.`,
          400
        );
      }
    });
  }
  /**
   * Validates that the purchaseDate and purchaseTime are in valid formats.
   * Throws an HTTPError if the formats are incorrect.
   */
  validateDateAndTimeFormats() {
    const validDate = this.isValidDate(this.purchaseDate);
    if (!validDate) {
      throw new http_error_1.HTTPError(
        'Invalid purchaseDate format. Expected a valid date format (e.g., YYYY-MM-DD, MM/DD/YYYY).',
        400
      );
    }
    // Validate purchaseTime against the HH:mm format (24-hour clock).
    const validTime = this.isValidTime(this.purchaseTime);
    if (!validTime) {
      throw new http_error_1.HTTPError(
        'Invalid purchaseTime format. Expected format: HH:MM (24-hour clock).',
        400
      );
    }
  }
  /**
   * Checks if the provided date string is valid. Accepts various common date formats.
   */
  isValidDate(date) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }
  /**
   * Validates the purchase time format as HH:mm (24-hour clock).
   */
  isValidTime(time) {
    // Regex for HH:mm format, where HH are 00-23 and mm are 00-59.
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(time);
  }
}
exports.ReceiptEntity = ReceiptEntity;
