import { Receipt } from '../../types/domain/receipt';
import { InMemoryReceiptRepository } from './in-memory-receipt-repository';

// Mocking the singleton method `getInstance` to control the instance used in the test
jest.spyOn(InMemoryReceiptRepository, 'getInstance');

describe('InMemoryReceiptRepository', () => {
  let repository: InMemoryReceiptRepository;

  const mockReceipt: Receipt = {
    retailer: 'Target',
    purchaseDate: '2022-01-01',
    purchaseTime: '13:01',
    items: [
      { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
      { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
      { shortDescription: 'Knorr Creamy Chicken', price: '1.26' },
      { shortDescription: 'Doritos Nacho Cheese', price: '3.35' },
      { shortDescription: 'Klarbrunn 12-PK 12 FL OZ', price: '12.00' },
    ],
    total: '35.35',
  };

  beforeEach(() => {
    // Mock the `getInstance` to return a new, fresh instance of the repository for each test
    repository = InMemoryReceiptRepository.getInstance();
    jest.clearAllMocks(); // Clear mock calls to ensure clean tests
  });

  describe('save', () => {
    it('should save a receipt and return the id', () => {
      const points = 10;
      const id = repository.save('receipt1', mockReceipt, points);

      expect(id).toBe('receipt1');
    });

    it('should save multiple receipts with unique ids', () => {
      const points1 = 10;
      const points2 = 20;

      const id1 = repository.save('receipt1', mockReceipt, points1);
      const id2 = repository.save('receipt2', mockReceipt, points2);

      expect(id1).toBe('receipt1');
      expect(id2).toBe('receipt2');
    });
  });

  describe('find', () => {
    it('should return the correct points for a saved receipt', () => {
      const points = 10;
      repository.save('receipt1', mockReceipt, points);

      const result = repository.find('receipt1');

      expect(result).toEqual({ ...mockReceipt, id: 'receipt1', points: 10 });
    });

    it('should return null for a non-existent receipt', () => {
      const result = repository.find('nonExistentId');

      expect(result).toBeNull();
    });

    it('should return null for a receipt with zero points', () => {
      const points = 0;
      repository.save('receipt1', mockReceipt, points);

      const result = repository.find('receipt1');

      expect(result).toBeNull();
    });
  });
});
