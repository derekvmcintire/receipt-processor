import { InMemoryReceiptDatabase } from '../../../../infrastructure/database/in-memory-receipt-database';
import { PointsCalculator } from '../../utils/points-calculator';
import { IReceiptService, ReceiptService } from './receipt-service';

/**
 * Factory function to ecnapsulate the creation of ReceiptService and its dependencies
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (
  inMemoryReceiptRepository = new InMemoryReceiptDatabase(),
  pointsCalculator = new PointsCalculator()
): IReceiptService => {
  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator);
};
