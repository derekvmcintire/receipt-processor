import { Receipt } from '../../../../types/domain/receipt';

/**
 * Interface representing the ReceiptService for processing receipts
 */
export interface IReceiptService {
  /**
   * Processes a receipt and returns a receipt ID.
   *
   * @param {Receipt} receipt - The receipt object to process.
   * @returns {string} The generated receipt ID.
   */
  processReceipt(receipt: Receipt): string;
}
