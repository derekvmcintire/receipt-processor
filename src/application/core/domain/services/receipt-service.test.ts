import { ReceiptService } from './receipt-service';
import { HTTPError } from '../../../../interface/errors/http-error';
import { PointsCalculator } from '../../utils/points-calculator';
import { InMemoryReceiptRepository } from '../../../../infrastructure/repositories/in-memory-receipt-repository';
import { Receipt } from '../entities/receipt';
import { mockReceipt } from '../../../../types/domain/receipt';

jest.mock('../../utils/points-calculator');

describe('ReceiptService', () => {
  let receiptService: ReceiptService;
  let mockRepository: jest.Mocked<InMemoryReceiptRepository>;
  let mockPointsCalculator: jest.Mocked<PointsCalculator>;

  const validReceiptData = mockReceipt;

  beforeEach(() => {
    // Mocking the Singleton's getInstance method to return a mocked repository instance
    mockRepository = {
      find: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<InMemoryReceiptRepository>;

    // Mock the getInstance method of the InMemoryReceiptRepository class
    jest
      .spyOn(InMemoryReceiptRepository, 'getInstance')
      .mockReturnValue(mockRepository);

    // Mock the PointsCalculator
    mockPointsCalculator =
      new PointsCalculator() as jest.Mocked<PointsCalculator>;
    mockPointsCalculator.calculate.mockReturnValue(50);

    // Create the ReceiptService instance using the mocked repository
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

  describe('findReceiptPoints', () => {
    it('should return points when receipt is found', () => {
      const receiptId = '123';
      console.log('validReceiptData: ', validReceiptData);
      const receipt = new Receipt(validReceiptData);
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
        new HTTPError(
          `Unable to retrieve saved Receipt from id ${receiptId}`,
          404
        )
      );
    });
  });
});
