'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InMemoryReceiptRepository = void 0;
/**
 * A repository for storing receipts in memory.
 * Data is stored in a Map object for efficient key-value management.
 * Maps each receipt ID (string) to an object containing the receipt and its associated points.
 */
class InMemoryReceiptRepository {
  /**
   * Private constructor to prevent direct instantiation.
   */
  constructor() {
    /**
     * In-memory store for receipts.
     */
    this.receipts = new Map();
  }
  /**
   * Static method to access the single instance of the repository.
   * If the instance does not exist, it will be created.
   */
  static getInstance() {
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
  save(id, receipt, points) {
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
  find(id) {
    const savedReceipt = this.receipts.get(id);
    if (!savedReceipt?.points) {
      return null;
    }
    return { ...savedReceipt.receipt, id, points: savedReceipt.points };
  }
}
exports.InMemoryReceiptRepository = InMemoryReceiptRepository;
