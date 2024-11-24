import { InMemoryReceiptDatabase } from '../../../../infrastructure/database/in-memory-receipt-database';
import { PointsCalculator } from '../../utils/points-calculator';
import { IReceiptService, ReceiptService } from './receipt-service';

/**
 * Factory function to ecnapsulate the creation of ReceiptService and its dependencies
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (): IReceiptService => {
  const inMemoryReceiptRepository = new InMemoryReceiptDatabase();
  const pointsCalculator = new PointsCalculator();

  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator); // This now returns IReceiptService
};
