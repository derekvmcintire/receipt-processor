import { ReceiptEntity } from '../entities/receipt';
import { HTTPError } from '../../../../interface/errors/http-error';
import { generateRandomUUID } from '../../../../utils/uuid-generator'; // Import the UUID utility
import { mockReceipt } from '../../../../types/domain/receipt';

jest.mock('../../../../utils/uuid-generator'); // mock `generateRandomUUID`

describe('Receipt Entity', () => {
  const validReceiptData = mockReceipt;

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
});
