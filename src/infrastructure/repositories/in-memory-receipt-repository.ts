import { IReceiptRepository } from '../../application/core/domain/repositories/receipt-repository-interface';
import { Receipt, ReceiptWithIdAndPoints } from '../../types/domain/receipt';

/**
 * A repository for storing receipts in memory.
 * Data is stored in a Map object for efficient key-value management.
 * Maps each receipt ID (string) to an object containing the receipt and its associated points.
 */
export class InMemoryReceiptRepository implements IReceiptRepository {
  /**
   * In-memory store for receipts.
   */
  private receipts: Map<string, { receipt: Receipt; points: number }> =
    new Map();

  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor() {}

  /**
   * Static instance of the repository (Singleton).
   */
  private static instance: InMemoryReceiptRepository;

  /**
   * Static method to access the single instance of the repository.
   * If the instance does not exist, it will be created.
   */
  public static getInstance(): InMemoryReceiptRepository {
    if (!InMemoryReceiptRepository.instance) {
      InMemoryReceiptRepository.instance = new InMemoryReceiptRepository();
    }
    return InMemoryReceiptRepository.instance;
  }

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
   * @returns {ReceiptWithIdAndPoints | null}
   * An object containing the receipt and points if found, otherwise null.
   */
  find(id: string): ReceiptWithIdAndPoints | null {
    const savedReceipt = this.receipts.get(id);
    if (!savedReceipt?.points) {
      return null;
    }
    return { ...savedReceipt.receipt, id, points: savedReceipt.points };
  }
}
