'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReceiptService = void 0;
const receipt_1 = require('../entities/receipt');
const http_error_1 = require('../../../../interface/errors/http-error');
/**
 * Service class that encapsulates the core business logic for processing receipts.
 * This class coordinates the following operations:
 * - Receipt validation via the Receipt entity.
 * - Reward points calculation.
 * - Persisting the receipt and its associated points in the repository.
 */
class ReceiptService {
  /**
   * Creates an instance of the ReceiptService.
   *
   * @param repository - Repository responsible for saving and retrieving receipts.
   * @param pointsCalculator - Utility for calculating reward points for receipts.
   */
  constructor(repository, pointsCalculator) {
    this.repository = repository;
    this.pointsCalculator = pointsCalculator;
  }
  /**
   * Processes a receipt by performing the following steps:
   * 1. Validates the receipt data by creating a Receipt entity.
   * 2. Calculates reward points for the receipt using the provided PointsCalculator.
   * 3. Saves the validated receipt and its calculated points to the repository.
   *
   * @param data - The receipt data to process, excluding the ID (it is generated automatically).
   * @returns The unique ID of the successfully processed receipt.
   * @throws Will throw an error if the receipt data is invalid or saving fails.
   */
  processReceipt(data) {
    const receipt = new receipt_1.ReceiptEntity(data);
    const points = this.pointsCalculator.calculate(receipt);
    this.repository.save(receipt.id, receipt, points);
    return receipt.id;
  }
  /**
   * Retrieves the points for a receipt using its unique ID.
   *
   * This method attempts to fetch the receipt from the repository using the provided ID.
   * If the receipt is found, it returns the associated points. If not, it throws an error.
   *
   * @param {string} id - The unique ID of the receipt to retrieve points for.
   * @returns {GetPointsResponse | null} The points associated with the receipt.
   * @throws {HTTPError} Throws an error if the receipt cannot be found in the repository.
   */
  findReceiptPoints(id) {
    const savedReceipt = this.repository.find(id);
    if (!savedReceipt) {
      throw new http_error_1.HTTPError(
        `Unable to retrieve saved Receipt from id ${id}`,
        404
      );
    }
    return { points: savedReceipt.points };
  }
}
exports.ReceiptService = ReceiptService;
