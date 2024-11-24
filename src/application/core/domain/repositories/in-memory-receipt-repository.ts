import { Receipt } from '../../../../types/domain/receipt';
import { GetPointsResponse } from '../../../../types/http/get-receipt-points';

/**
 * A repository for storing receipts in memory.
 * Data is stored in a Map object for efficient key-value management.
 * Maps each receipt ID (string) to an object containing the receipt and its associated points.
 */
export class InMemoryReceiptRepository {
  /**
   * In-memory store for receipts.
   */
  private receipts: Map<string, { receipt: Receipt; points: number }> =
    new Map();

  /**
   * Saves a receipt to the in-memory store.
   * @param {string} id
   * @param {Receipt} receipt
   * @param {number} points
   * @returns {string} The id of the stored receipt.
   */
  save(id: string, receipt: Receipt, points: number): string {
    this.receipts.set(id, { receipt, points });
    return id;
  }

  /**
   * Finds a receipt by its ID.
   * Retrieves the stored receipt and its associated points from the in-memory store.
   * @param {string} id
   * @returns {GetPointsResponse | null}
   * An object containing the receipt and points if found, otherwise null.
   */
  find(id: string): GetPointsResponse | null {
    const savedReceipt = this.receipts.get(id);
    if (!savedReceipt?.points) {
      return null;
    }
    return { points: savedReceipt.points };
  }
}
