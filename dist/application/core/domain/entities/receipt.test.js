'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const receipt_1 = require('../entities/receipt');
const http_error_1 = require('../../../../interface/errors/http-error');
const uuid_generator_1 = require('../../../../utils/uuid-generator'); // Import the UUID utility
const receipt_2 = require('../../../../types/domain/receipt');
jest.mock('../../../../utils/uuid-generator'); // mock `generateRandomUUID`
describe('Receipt Entity', () => {
  const validReceiptData = receipt_2.mockReceipt;
  const mockGenerateUUID = jest
    .fn()
    .mockReturnValue('123e4567-e89b-12d3-a456-426614174000');
  beforeAll(() => {
    // as jest.Mock to make typescript happy
    uuid_generator_1.generateRandomUUID.mockImplementation(mockGenerateUUID);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should create a Receipt instance with valid data and a generated ID', () => {
    const receipt = new receipt_1.ReceiptEntity(
      validReceiptData,
      uuid_generator_1.generateRandomUUID
    );
    expect(receipt).toBeInstanceOf(receipt_1.ReceiptEntity);
    expect(receipt.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(mockGenerateUUID).toHaveBeenCalledTimes(1);
  });
  it('should throw an HTTPError if required fields are missing', () => {
    const invalidReceiptData = { ...validReceiptData, retailer: '' };
    expect(
      () =>
        new receipt_1.ReceiptEntity(
          invalidReceiptData,
          uuid_generator_1.generateRandomUUID
        )
    ).toThrow(
      new http_error_1.HTTPError(
        'Invalid receipt data. Required fields: retailer, purchaseDate, purchaseTime, items, total.',
        400
      )
    );
  });
  it('should allow overriding the ID if provided', () => {
    const receiptWithId = new receipt_1.ReceiptEntity(
      { ...validReceiptData, id: 'custom-id' },
      uuid_generator_1.generateRandomUUID
    );
    expect(receiptWithId.id).toBe('custom-id');
  });
});
