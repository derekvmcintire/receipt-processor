import { Receipt } from '../../types/domain/receipt';
import { InMemoryReceiptDatabase } from './in-memory-receipt-database';

describe('InMemoryReceiptRepository', () => {
  let repository: InMemoryReceiptDatabase;

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
    repository = new InMemoryReceiptDatabase();
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

      expect(result).toEqual({ points: 10 });
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
