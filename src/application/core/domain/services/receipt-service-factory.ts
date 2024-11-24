import { PointsCalculator } from '../../utils/points-calculator';
import { InMemoryReceiptRepository } from '../repositories/InMemoryReceiptRepository';
import { ReceiptService } from './receipt-service';

/**
 * Factory function to ecnapsulate the creation of ReceiptService and its dependencies
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (): ReceiptService => {
  const inMemoryReceiptRepository = new InMemoryReceiptRepository();
  const pointsCalculator = new PointsCalculator();

  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator);
};
