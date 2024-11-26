'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const receipt_service_factory_1 = require('../../../application/core/domain/services/receipt-service-factory');
const http_error_1 = require('../../errors/http-error');
const receipt_1 = require('../../../types/domain/receipt');
const process_receipt_controller_1 = require('./process-receipt-controller');
jest.mock(
  '../../../application/core/domain/services/receipt-service-factory',
  () => ({
    getReceiptService: jest.fn(),
  })
);
describe('processReceiptController', () => {
  let mockReply;
  let mockRequest;
  let mockedReceiptService;
  beforeEach(() => {
    jest.clearAllMocks();
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockRequest = {
      body: receipt_1.mockReceipt,
    };
    mockedReceiptService = {
      processReceipt: jest.fn().mockReturnValue('12345'), // Mock processReceipt to return a receipt ID
      findReceiptPoints: jest.fn(),
    };
    // Mock the getReceiptService factory function to return the mocked ReceiptService
    receipt_service_factory_1.getReceiptService.mockReturnValue(
      mockedReceiptService
    );
  });
  it('should return 201 and the receipt ID when the receipt is successfully processed', async () => {
    (0, process_receipt_controller_1.processReceiptController)(
      mockRequest,
      mockReply
    );
    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({ id: '12345' });
  });
  it('should return 400 and an error message when HTTPError is thrown', async () => {
    const errorMessage = 'Invalid receipt data';
    mockedReceiptService.processReceipt.mockImplementation(() => {
      throw new http_error_1.HTTPError(errorMessage, 400);
    });
    (0, process_receipt_controller_1.processReceiptController)(
      mockRequest,
      mockReply
    );
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ error: errorMessage });
  });
  it('should return 500 and a generic error message for unexpected errors', async () => {
    const errorMessage = 'Some unexpected error';
    mockedReceiptService.processReceipt.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    (0, process_receipt_controller_1.processReceiptController)(
      mockRequest,
      mockReply
    );
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'An unexpected error occurred.',
    });
  });
});