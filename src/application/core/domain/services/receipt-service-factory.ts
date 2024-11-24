import { PointsCalculator } from '../../utils/points-calculator';
import { InMemoryReceiptRepository } from '../repositories/InMemoryReceiptRepository';
import { ReceiptService } from './receipt-service';

/**
 * Factory function to create and return a new instance of ReceiptService.
 * This function encapsulates the creation of the ReceiptService along with
 * its dependencies, namely the InMemoryReceiptRepository and PointsCalculator.
 *
 * It simplifies the instantiation process and ensures that the ReceiptService
 * is correctly configured with all required dependencies.
 *
 * @returns {ReceiptService}
 */
export const getReceiptService = (): ReceiptService => {
  const inMemoryReceiptRepository = new InMemoryReceiptRepository();
  const pointsCalculator = new PointsCalculator();

  return new ReceiptService(inMemoryReceiptRepository, pointsCalculator);
};
