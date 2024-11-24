import { Receipt } from '../../../../types/domain/receipt';
import { GetPointsResponse } from '../../../../types/http/get-receipt-points';

/**
 * Interface for a receipt repository.
 * It defines methods to save a receipt and retrieve receipt points.
 */
export interface IReceiptRepository {
  /**
   * Saves a receipt to the repository.
   * @param {string} id - The receipt ID.
   * @param {Receipt} receipt - The receipt data.
   * @param {number} points - The points associated with the receipt.
   * @returns {string} The id of the stored receipt.
   */
  save(id: string, receipt: Receipt, points: number): string;

  /**
   * Finds a receipt by its ID and returns its associated points.
   * @param {string} id - The receipt ID.
   * @returns {GetPointsResponse | null} The points associated with the receipt, or null if not found.
   */
  find(id: string): GetPointsResponse | null;
}
