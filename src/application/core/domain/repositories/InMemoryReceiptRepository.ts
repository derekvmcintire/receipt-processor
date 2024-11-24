import { Receipt } from '../../../../types/domain/receipt';

/**
 * A repository for storing receipts in memory.
 * This is a temporary, in-memory implementation primarily used for testing or prototyping.
 * Data is stored in a Map object for efficient key-value management.
 */
export class InMemoryReceiptRepository {
  /**
   * An in-memory store for receipts.
   * Maps each receipt ID (string) to an object containing the receipt and its associated points.
   */
  private receipts: Map<string, { receipt: Receipt; points: number }> =
    new Map();

  /**
   * Saves a receipt to the in-memory store.
   * @param {string} id - The unique identifier for the receipt.
   * @param {Receipt} receipt - The receipt object to be stored.
   * @param {number} points - The points associated with the receipt.
   * @returns {string} The ID of the stored receipt.
   */
  save(id: string, receipt: Receipt, points: number): string {
    this.receipts.set(id, { receipt, points });
    return id;
  }

  /**
   * Finds a receipt by its ID.
   * Retrieves the stored receipt and its associated points from the in-memory store.
   * @param {string} id - The unique identifier for the receipt.
   * @returns {{ receipt: Receipt; points: number } | null}
   * An object containing the receipt and points if found, otherwise null.
   */
  find(id: string): { receipt: Receipt; points: number } | null {
    return this.receipts.get(id) || null;
  }
}
