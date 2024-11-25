import { ReceiptService } from './receipt-service';
import { HTTPError } from '../../../../interface/errors/http-error';
import { InMemoryReceiptDatabase } from '../../../../infrastructure/database/in-memory-receipt-database';
import { PointsCalculator } from '../../utils/points-calculator';
import * as crypto from 'crypto'; // Import crypto module directly
import { IReceiptService } from './receipt-service-interface';

// Since randomUUID is a function on the crypto module, we need to
// import crypto directly and spy on randomUUID
jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

jest.mock('../../../../infrastructure/database/in-memory-receipt-database');
jest.mock('../../utils/points-calculator');

describe('ReceiptService', () => {
  let receiptService: IReceiptService;
  let mockRepository: jest.Mocked<InMemoryReceiptDatabase>;
  let mockPointsCalculator: jest.Mocked<PointsCalculator>;

  const sampleReceipt = {
    retailer: 'Test Retailer',
    purchaseDate: '2024-10-10',
    purchaseTime: '14:30',
    total: '100',
    items: [
      { shortDescription: 'Item 1', price: '10' },
      { shortDescription: 'Item 2', price: '20' },
    ],
  };

  beforeEach(() => {
    mockRepository =
      new InMemoryReceiptDatabase() as jest.Mocked<InMemoryReceiptDatabase>;

    mockRepository.save.mockImplementation((id) => id);
    mockRepository.find.mockImplementation(() => ({ points: 50 }));

    mockPointsCalculator =
      new PointsCalculator() as jest.Mocked<PointsCalculator>;
    mockPointsCalculator.calculate.mockReturnValue(50);

    // Use jest.spyOn to mock randomUUID
    jest
      .spyOn(crypto, 'randomUUID')
      .mockReturnValue('123e4567-e89b-12d3-a456-426614174000');

    // Initialize ReceiptService with mocked dependencies
    receiptService = new ReceiptService(mockRepository, mockPointsCalculator);
  });

  describe('processReceipt', () => {
    it('should validate receipt, calculate points, and save receipt', () => {
      const result = receiptService.processReceipt(sampleReceipt);

      expect(result).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(mockRepository.save).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        sampleReceipt,
        50
      );
      expect(mockPointsCalculator.calculate).toHaveBeenCalledWith(
        sampleReceipt
      );
    });

    it('should throw an error if receipt is invalid', () => {
      const invalidReceipt = { ...sampleReceipt, retailer: '' };

      expect(() => receiptService.processReceipt(invalidReceipt)).toThrow(
        new HTTPError(
          'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, total.',
          400
        )
      );
      expect(mockPointsCalculator.calculate).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('validateReceipt', () => {
    it('should throw an error if required fields are missing', () => {
      const invalidReceipt = { ...sampleReceipt, retailer: '' };

      expect(() => receiptService.validateReceipt(invalidReceipt)).toThrow(
        new HTTPError(
          'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, total.',
          400
        )
      );
    });

    it('should not throw an error if receipt is valid', () => {
      expect(() => receiptService.validateReceipt(sampleReceipt)).not.toThrow();
    });
  });

  describe('calculatePoints', () => {
    it('should calculate points using the points calculator', () => {
      const result = receiptService.calculatePoints(sampleReceipt);

      expect(result).toBe(50);
      expect(mockPointsCalculator.calculate).toHaveBeenCalledWith(
        sampleReceipt
      );
    });
  });

  describe('saveReceipt', () => {
    it('should save receipt to repository', () => {
      const points = 50;

      receiptService.saveReceipt(
        '123e4567-e89b-12d3-a456-426614174000',
        sampleReceipt,
        points
      );

      expect(mockRepository.save).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        sampleReceipt,
        points
      );
    });
  });
});
