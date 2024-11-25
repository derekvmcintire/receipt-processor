import { Receipt } from "../../../../types/domain/receipt";

/**
 * Interface representing the ReceiptService for processing, validating, 
 * calculating points, and saving receipt data.
 */
export interface IReceiptService {
  /**
   * Processes a receipt and generates a receipt ID.
   * 
   * @param {Receipt} receipt - The receipt object to process.
   * @returns {string} The generated receipt ID.
   */
  processReceipt(receipt: Receipt): string;

  /**
   * Validates the given receipt. Throws an error if validation fails.
   * 
   * @param {Receipt} receipt - The receipt object to validate.
   */
  validateReceipt(receipt: Receipt): void;

  /**
   * Calculates and returns the points associated with the receipt.
   * 
   * @param {Receipt} receipt - The receipt object to calculate points for.
   * @returns {number} The calculated points.
   */
  calculatePoints(receipt: Receipt): number;

  /**
   * Saves a receipt along with its calculated points.
   * 
   * @param {string} id - The ID of the receipt to save.
   * @param {Receipt} receipt - The receipt object to save.
   * @param {number} points - The points associated with the receipt.
   */
  saveReceipt(id: string, receipt: Receipt, points: number): void;
}
