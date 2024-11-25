import { ReceiptService } from './receipt-service';
import { HTTPError } from '../../../../interface/errors/http-error';
import { PointsCalculator } from '../../utils/points-calculator';
import { InMemoryReceiptRepository } from '../../../../infrastructure/repositories/in-memory-receipt-repository';
import { Receipt } from '../entities/receipt';

jest.mock(
  '../../../../infrastructure/repositories/in-memory-receipt-repository'
);
jest.mock('../../utils/points-calculator');

describe('ReceiptService', () => {
  let receiptService: ReceiptService;
  let mockRepository: jest.Mocked<InMemoryReceiptRepository>;
  let mockPointsCalculator: jest.Mocked<PointsCalculator>;

  const validReceiptData = {
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
      new InMemoryReceiptRepository() as jest.Mocked<InMemoryReceiptRepository>;
    mockRepository.save.mockImplementation((id) => id);

    mockPointsCalculator =
      new PointsCalculator() as jest.Mocked<PointsCalculator>;
    mockPointsCalculator.calculate.mockReturnValue(50);

    receiptService = new ReceiptService(mockRepository, mockPointsCalculator);
  });

  describe('processReceipt', () => {
    it('should validate receipt, calculate points, and save receipt', () => {
      const result = receiptService.processReceipt(validReceiptData);

      expect(result).toBeDefined(); // Check ID is generated
      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockPointsCalculator.calculate).toHaveBeenCalledWith(
        expect.any(Receipt)
      );
    });

    it('should throw an error if receipt validation fails', () => {
      const invalidReceiptData = { ...validReceiptData, retailer: '' };

      expect(() => receiptService.processReceipt(invalidReceiptData)).toThrow(
        new HTTPError(
          'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
          400
        )
      );
      expect(mockPointsCalculator.calculate).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
});
