import { ReceiptEntity } from '../entities/receipt';
import { HTTPError } from '../../../../interface/errors/http-error';
import { generateRandomUUID } from '../../../../utils/uuid-generator';
import { mockReceipt, ReceiptItem } from '../../../../types/domain/receipt';

jest.mock('../../../../utils/uuid-generator'); // mock `generateRandomUUID`

describe('Receipt Entity', () => {
  const validReceiptData = mockReceipt;

  const mockGenerateUUID = jest
    .fn()
    .mockReturnValue('123e4567-e89b-12d3-a456-426614174000');

  beforeAll(() => {
    // As jest.Mock to make TypeScript happy
    (generateRandomUUID as jest.Mock).mockImplementation(mockGenerateUUID);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should create a Receipt instance with valid data and a generated ID', () => {
    const receipt = new ReceiptEntity(validReceiptData, generateRandomUUID);

    expect(receipt).toBeInstanceOf(ReceiptEntity);
    expect(receipt.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(mockGenerateUUID).toHaveBeenCalledTimes(1);
  });

  it('should throw an HTTPError if required fields are missing', () => {
    const invalidReceiptData = { ...validReceiptData, retailer: '' };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(
      new HTTPError(
        'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
        400
      )
    );
  });

  it('should allow overriding the ID if provided', () => {
    const receiptWithId = new ReceiptEntity(
      { ...validReceiptData, id: 'custom-id' },
      generateRandomUUID
    );

    expect(receiptWithId.id).toBe('custom-id');
  });

  it('should throw an HTTPError if the total does not match the sum of the item prices', () => {
    const invalidReceiptData = {
      ...validReceiptData,
      total: '20.00', // Set an incorrect total
    };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(
      new HTTPError(
        `The total (20.00) does not match the sum of item prices.`,
        400
      )
    );
  });

  it('should validate items and throw an HTTPError if items are invalid', () => {
    const invalidReceiptData = {
      ...validReceiptData,
      items: [
        { shortDescription: '', price: '10.00' }, // Invalid item
        { shortDescription: 'Item 2', price: '5.00' },
      ],
      total: '15.00',
    };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(
      new HTTPError(
        `Item at index 0 is missing a valid 'shortDescription'.`,
        400
      )
    );
  });

  it('should throw an HTTPError if items array is empty', () => {
    const invalidReceiptData = { ...validReceiptData, items: [] };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(new HTTPError('Items must be a non-empty array.', 400));
  });

  it('should throw an HTTPError if an item has an invalid price', () => {
    const invalidReceiptData = {
      ...validReceiptData,
      items: [
        { shortDescription: 'Item 1', price: 'invalid-price' }, // Invalid price
      ],
      total: '0.00',
    };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(new HTTPError(`Item at index 0 has an invalid 'price'.`, 400));
  });

  it('should throw an HTTPError if the purchaseDate format is invalid', () => {
    const invalidReceiptData = {
      ...validReceiptData,
      purchaseDate: 'invalid-date',
    };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(
      new HTTPError(
        'Invalid purchaseDate format. Expected a valid date format (e.g., YYYY-MM-DD, MM/DD/YYYY).',
        400
      )
    );
  });

  it('should throw an HTTPError if the purchaseTime format is invalid', () => {
    const invalidReceiptData = {
      ...validReceiptData,
      purchaseTime: 'invalid-time',
    };

    expect(
      () => new ReceiptEntity(invalidReceiptData, generateRandomUUID)
    ).toThrow(
      new HTTPError(
        'Invalid purchaseTime format. Expected format: HH:MM (24-hour clock).',
        400
      )
    );
  });
});
