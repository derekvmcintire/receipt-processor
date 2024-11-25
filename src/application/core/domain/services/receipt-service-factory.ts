import { InMemoryReceiptRepository } from '../../../../infrastructure/repositories/in-memory-receipt-repository';
import { PointsCalculator } from '../../utils/points-calculator';
import { ReceiptService } from './receipt-service';
import { IReceiptService } from './receipt-service-interface';

/**
 * Factory function to encapsulate the creation of ReceiptService and its dependencies.
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (
  inMemoryReceiptRepository = InMemoryReceiptRepository.getInstance(), // Use Singleton instance
  pointsCalculator = new PointsCalculator()
): IReceiptService => {
  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator);
};
