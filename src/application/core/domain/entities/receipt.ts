import { HTTPError } from '../../../../interface/errors/http-error';
import { ReceiptWithId, ReceiptItem } from '../../../../types/domain/receipt';
import { generateRandomUUID } from '../../../../utils/uuid-generator';

/**
 * Represents a Receipt entity in the domain layer.
 * This class encapsulates the core properties and behaviors of a receipt,
 * including validation logic to ensure data integrity.
 */
export class Receipt implements ReceiptWithId {
  id: string;
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: ReceiptItem[];
  total: string;

  constructor(
    data: Omit<ReceiptWithId, 'id'> & { id?: string },
    generateUUID: () => string = generateRandomUUID
  ) {
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
  private validate(): void {
    this.validateRequiredFields();
    this.validateTotal();
    this.validateItems();
    this.validateDateAndTimeFormats();
  }

  /**
   * Validates that all required fields are provided.
   * Throws an HTTPError if any required field is missing.
   */
  private validateRequiredFields(): void {
    if (
      !this.retailer ||
      !this.purchaseDate ||
      !this.purchaseTime ||
      !this.items ||
      !this.total
    ) {
      throw new HTTPError(
        'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
        400
      );
    }
  }

  /**
   * Validates that the total matches the sum of the item prices.
   * Throws an HTTPError if the total does not match the sum of item prices.
   */
  private validateTotal(): void {
    const calculatedTotal = this.items.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );

    const parsedTotal = parseFloat(this.total);

    const roundedCalculatedTotal = Math.round(calculatedTotal * 100) / 100;
    const roundedParsedTotal = Math.round(parsedTotal * 100) / 100;

    if (roundedParsedTotal !== roundedCalculatedTotal) {
      throw new HTTPError(
        `The total (${this.total}) does not match the sum of item prices.`,
        400
      );
    }
  }

  /**
   * Validates that the items array is not empty and each item has valid properties.
   * Throws an HTTPError if the items array is empty or any item is invalid.
   */
  private validateItems(): void {
    if (!Array.isArray(this.items) || this.items.length === 0) {
      throw new HTTPError('Items must be a non-empty array.', 400);
    }

    this.items.forEach((item, index) => {
      if (!item.shortDescription || typeof item.shortDescription !== 'string') {
        throw new HTTPError(
          `Item at index ${index} is missing a valid 'shortDescription'.`,
          400
        );
      }
      if (!item.price || isNaN(parseFloat(item.price))) {
        throw new HTTPError(
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
  private validateDateAndTimeFormats(): void {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Validate YYYY-MM-DD format
    if (!dateRegex.test(this.purchaseDate)) {
      throw new HTTPError(
        'Invalid purchaseDate format. Expected format: YYYY-MM-DD.',
        400
      );
    }

    const timeRegex = /^\d{2}:\d{2}$/; // Validate HH:MM format
    if (!timeRegex.test(this.purchaseTime)) {
      throw new HTTPError(
        'Invalid purchaseTime format. Expected format: HH:MM.',
        400
      );
    }
  }
}
