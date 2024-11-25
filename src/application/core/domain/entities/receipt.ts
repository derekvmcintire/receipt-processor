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

  /**
   * Creates a new Receipt entity.
   *
   * @param data - The receipt data to initialize the entity.
   * @param generateUUID - A function to generate a unique ID (default: crypto.randomUUID).
   */
  constructor(
    data: Omit<ReceiptWithId, 'id'> & { id?: string },
    generateUUID: () => string = generateRandomUUID
  ) {
    this.id = data.id ?? generateUUID(); // Generate a unique ID if none is provided

    // Assign the other properties
    this.retailer = data.retailer;
    this.purchaseDate = data.purchaseDate;
    this.purchaseTime = data.purchaseTime;
    this.items = data.items;
    this.total = data.total;

    this.validate();
  }

  /**
   * Validates the receipt entity to ensure all required fields are present.
   *
   * @throws {HTTPError} If any of the required fields are missing.
   */
  private validate(): void {
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
}
