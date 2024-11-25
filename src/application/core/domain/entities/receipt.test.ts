import { Receipt } from '../entities/receipt';
import { HTTPError } from '../../../../interface/errors/http-error';
import { generateRandomUUID } from '../../../../utils/uuid-generator'; // Import the UUID utility

jest.mock('../../../../utils/uuid-generator'); // mock `generateRandomUUID`

describe('Receipt Entity', () => {
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

  const mockGenerateUUID = jest
    .fn()
    .mockReturnValue('123e4567-e89b-12d3-a456-426614174000');

  beforeAll(() => {
    // as jest.Mock to make typescript happy
    (generateRandomUUID as jest.Mock).mockImplementation(mockGenerateUUID);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should create a Receipt instance with valid data and a generated ID', () => {
    const receipt = new Receipt(validReceiptData, generateRandomUUID);

    expect(receipt).toBeInstanceOf(Receipt);
    expect(receipt.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(mockGenerateUUID).toHaveBeenCalledTimes(1);
  });

  it('should throw an HTTPError if required fields are missing', () => {
    const invalidReceiptData = { ...validReceiptData, retailer: '' };

    expect(() => new Receipt(invalidReceiptData, generateRandomUUID)).toThrow(
      new HTTPError(
        'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
        400
      )
    );
  });

  it('should allow overriding the ID if provided', () => {
    const receiptWithId = new Receipt(
      { ...validReceiptData, id: 'custom-id' },
      generateRandomUUID
    );

    expect(receiptWithId.id).toBe('custom-id');
  });
});
