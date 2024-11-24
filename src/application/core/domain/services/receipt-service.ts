import { randomUUID } from 'crypto';
import { Receipt } from '../../../../types/domain/receipt';
import { PointsCalculator } from '../../utils/points-calculator';
import { InMemoryReceiptRepository } from '../repositories/InMemoryReceiptRepository';
import { HTTPError } from '../../../../interface/errors/http-error';

/**
 * Service class that handles the core business logic for processing receipts.
 * It includes methods for validating receipt data, calculating points, and saving receipts.
 */
export class ReceiptService {
  /**
   * Constructor to initialize the ReceiptService with a repository and points calculator.
   *
   * @param repository
   * @param pointsCalculator
   */
  constructor(
    private repository: InMemoryReceiptRepository,
    private pointsCalculator: PointsCalculator
  ) {}

  /**
   * Validates the receipt to ensure all required fields are present.
   * Throws an HTTPError with status 400 if any required field is missing.
   *
   * @param receipt
   */
  validateReceipt(receipt: Receipt): void {
    if (
      !receipt.retailer ||
      !receipt.purchaseDate ||
      !receipt.purchaseTime ||
      !receipt.total
    ) {
      throw new HTTPError(
        'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, total.',
        400
      );
    }
  }

  /**
   * Calculates the reward points for a receipt based on predefined business rules.
   * Delegates the calculation to the PointsCalculator.
   *
   * @param receipt
   * @returns The total points calculated for the receipt.
   */
  calculatePoints(receipt: Receipt): number {
    return this.pointsCalculator.calculate(receipt);
  }

  /**
   * Saves the receipt to the repository with the calculated points.
   * Throws an HTTPError with status 500 if saving fails.
   *
   * @param id - The unique ID of the receipt (typically generated by UUID).
   * @param receipt - The receipt object to save.
   * @param points - The points associated with the receipt to be stored.
   */
  saveReceipt(id: string, receipt: Receipt, points: number): void {
    const savedId = this.repository.save(id, receipt, points);

    if (savedId !== id) {
      throw new HTTPError('Failed to save receipt.', 500);
    }
  }

  /**
   * The main method that processes a receipt: validates, calculates points, and saves it.
   * Throws errors if any of the individual steps fail.
   *
   * @param receipt
   * @returns The unique id of the processed receipt.
   */
  processReceipt(receipt: Receipt): string {
    this.validateReceipt(receipt);

    const id = randomUUID();
    const points = this.calculatePoints(receipt);

    this.saveReceipt(id, receipt, points);

    return id;
  }
}
