'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const receipt_service_factory_1 = require('../../../application/core/domain/services/receipt-service-factory');
const http_error_1 = require('../../errors/http-error');
const get_receipt_points_controller_1 = require('./get-receipt-points-controller');
jest.mock(
  '../../../application/core/domain/services/receipt-service-factory',
  () => ({
    getReceiptService: jest.fn(),
  })
);
describe('getReceiptPointsController', () => {
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
      params: { id: 'receipt1' },
    };
    mockedReceiptService = {
      processReceipt: jest.fn(),
      findReceiptPoints: jest.fn(),
    };
    // Mock the getReceiptService factory function to return the mocked ReceiptService
    receipt_service_factory_1.getReceiptService.mockReturnValue(
      mockedReceiptService
    );
  });
  it('should return 200 and the receipt points when the receipt is found', async () => {
    const mockResponse = { points: 10 };
    mockedReceiptService.findReceiptPoints.mockReturnValue(mockResponse);
    await (0, get_receipt_points_controller_1.getReceiptPointsController)(
      mockRequest,
      mockReply
    );
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });
  it('should return 404 and an error message when receipt is not found', async () => {
    const errorMessage = 'Receipt not found';
    mockedReceiptService.findReceiptPoints.mockImplementation(() => {
      throw new http_error_1.HTTPError(errorMessage, 404);
    });
    await (0, get_receipt_points_controller_1.getReceiptPointsController)(
      mockRequest,
      mockReply
    );
    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({ error: errorMessage });
  });
  it('should return 500 and a generic error message for unexpected errors', async () => {
    const errorMessage = 'Some unexpected error';
    mockedReceiptService.findReceiptPoints.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    await (0, get_receipt_points_controller_1.getReceiptPointsController)(
      mockRequest,
      mockReply
    );
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'An unexpected error occurred.',
    });
  });
});
