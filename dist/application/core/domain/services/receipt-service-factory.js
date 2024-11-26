'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getReceiptService = void 0;
const in_memory_receipt_repository_1 = require('../../../../infrastructure/repositories/in-memory-receipt-repository');
const points_calculator_1 = require('../../utils/points-calculator');
const receipt_service_1 = require('./receipt-service');
/**
 * Factory function to encapsulate the creation of ReceiptService and its dependencies.
 *
 * @returns {ReceiptService}
 */
const getReceiptService = (
  inMemoryReceiptRepository = in_memory_receipt_repository_1.InMemoryReceiptRepository.getInstance(), // Use Singleton instance
  pointsCalculator = new points_calculator_1.PointsCalculator()
) => {
  return new receipt_service_1.ReceiptService(
    inMemoryReceiptRepository,
    pointsCalculator
  );
};
exports.getReceiptService = getReceiptService;
