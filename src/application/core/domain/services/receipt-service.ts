import { PointsCalculator } from '../../utils/points-calculator';
import { InMemoryReceiptRepository } from '../../../../infrastructure/repositories/in-memory-receipt-repository';
import { IReceiptService } from './receipt-service-interface';
import { Receipt } from '../entities/receipt';

/**
 * Service class that encapsulates the core business logic for processing receipts.
 * This class coordinates the following operations:
 * - Receipt validation via the Receipt entity.
 * - Reward points calculation.
 * - Persisting the receipt and its associated points in the repository.
 */
export class ReceiptService implements IReceiptService {
  /**
   * Creates an instance of the ReceiptService.
   *
   * @param repository - Repository responsible for saving and retrieving receipts.
   * @param pointsCalculator - Utility for calculating reward points for receipts.
   */
  constructor(
    private repository: InMemoryReceiptRepository,
    private pointsCalculator: PointsCalculator
  ) {}

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
  processReceipt(data: Omit<Receipt, 'id'>): string {
    const receipt = new Receipt(data);
    const points = this.pointsCalculator.calculate(receipt);

    this.repository.save(receipt.id, receipt, points);

    return receipt.id;
  }
}
