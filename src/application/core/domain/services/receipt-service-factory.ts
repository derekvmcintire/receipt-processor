import { InMemoryReceiptRepository } from '../../../../infrastructure/repositories/in-memory-receipt-repository';
import { PointsCalculator } from '../../utils/points-calculator';
import { ReceiptService } from './receipt-service';
import { IReceiptService } from './receipt-service-interface';

/**
 * Factory function to ecnapsulate the creation of ReceiptService and its dependencies
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (
  inMemoryReceiptRepository = new InMemoryReceiptRepository(),
  pointsCalculator = new PointsCalculator()
): IReceiptService => {
  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator);
};
