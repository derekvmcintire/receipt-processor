'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const receipt_service_1 = require('./receipt-service');
const http_error_1 = require('../../../../interface/errors/http-error');
const points_calculator_1 = require('../../utils/points-calculator');
const in_memory_receipt_repository_1 = require('../../../../infrastructure/repositories/in-memory-receipt-repository');
const receipt_1 = require('../entities/receipt');
const receipt_2 = require('../../../../types/domain/receipt');
jest.mock('../../utils/points-calculator');
describe('ReceiptService', () => {
  let receiptService;
  let mockRepository;
  let mockPointsCalculator;
  const validReceiptData = receipt_2.mockReceipt;
  beforeEach(() => {
    // Mocking the Singleton's getInstance method to return a mocked repository instance
    mockRepository = {
      find: jest.fn(),
      save: jest.fn(),
    };
    // Mock the getInstance method of the InMemoryReceiptRepository class
    jest
      .spyOn(
        in_memory_receipt_repository_1.InMemoryReceiptRepository,
        'getInstance'
      )
      .mockReturnValue(mockRepository);
    // Mock the PointsCalculator
    mockPointsCalculator = new points_calculator_1.PointsCalculator();
    mockPointsCalculator.calculate.mockReturnValue(50);
    // Create the ReceiptService instance using the mocked repository
    receiptService = new receipt_service_1.ReceiptService(
      mockRepository,
      mockPointsCalculator
    );
  });
  describe('processReceipt', () => {
    it('should validate receipt, calculate points, and save receipt', () => {
      const result = receiptService.processReceipt(validReceiptData);
      expect(result).toBeDefined(); // Check ID is generated
      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockPointsCalculator.calculate).toHaveBeenCalledWith(
        expect.any(receipt_1.ReceiptEntity)
      );
    });
    it('should throw an error if receipt validation fails', () => {
      const invalidReceiptData = { ...validReceiptData, retailer: '' };
      expect(() => receiptService.processReceipt(invalidReceiptData)).toThrow(
        new http_error_1.HTTPError(
          'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
          400
        )
      );
      expect(mockPointsCalculator.calculate).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('findReceiptPoints', () => {
    it('should return points when receipt is found', () => {
      const receiptId = '123';
      console.log('validReceiptData: ', validReceiptData);
      const receipt = new receipt_1.ReceiptEntity(validReceiptData);
      receipt.id = receiptId;
      // Simulate saving the receipt in the repository
      mockRepository.find.mockReturnValueOnce({
        ...receipt,
        id: receiptId,
        points: 50,
      });
      const result = receiptService.findReceiptPoints(receiptId);
      expect(result).toEqual({ points: 50 });
      expect(mockRepository.find).toHaveBeenCalledWith(receiptId);
    });
    it('should throw 404 error when receipt is not found', () => {
      const receiptId = 'nonexistent-id';
      // Simulate no receipt found in the repository
      mockRepository.find.mockReturnValueOnce(null);
      expect(() => receiptService.findReceiptPoints(receiptId)).toThrow(
        new http_error_1.HTTPError(
          `Unable to retrieve saved Receipt from id ${receiptId}`,
          404
        )
      );
    });
  });
});
