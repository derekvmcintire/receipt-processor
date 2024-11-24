import { InMemoryReceiptDatabase } from '../../../../infrastructure/database/in-memory-database';
import { PointsCalculator } from '../../utils/points-calculator';
import { ReceiptService } from './receipt-service';

/**
 * Factory function to ecnapsulate the creation of ReceiptService and its dependencies
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (): ReceiptService => {
  const inMemoryReceiptRepository = new InMemoryReceiptDatabase();
  const pointsCalculator = new PointsCalculator();

  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator);
};
