import { getReceiptService } from '../../../application/core/domain/services/receipt-service-factory';
import { HTTPError } from '../../errors/http-error';
import { GetPointsResponse } from '../../../types/http/get-receipt-points';
import { getReceiptPointsController } from './get-receipt-points';
import { IReceiptService } from '../../../application/core/domain/services/receipt-service-interface';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock(
  '../../../application/core/domain/services/receipt-service-factory',
  () => ({
    getReceiptService: jest.fn(),
  })
);

describe('getReceiptPointsController', () => {
  let mockReply: FastifyReply;
  let mockRequest: FastifyRequest<{ Params: { id: string } }>;
  let mockedReceiptService: jest.Mocked<IReceiptService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    mockRequest = {
      params: { id: 'receipt1' },
    } as unknown as FastifyRequest<{ Params: { id: string } }>;

    mockedReceiptService = {
      processReceipt: jest.fn(),
      findReceiptPoints: jest.fn(),
    };

    // Mock the getReceiptService factory function to return the mocked ReceiptService
    (getReceiptService as jest.Mock).mockReturnValue(mockedReceiptService);
  });

  it('should return 200 and the receipt points when the receipt is found', async () => {
    const mockResponse: GetPointsResponse = { points: 10 };
    mockedReceiptService.findReceiptPoints.mockReturnValue(mockResponse);

    await getReceiptPointsController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 404 and an error message when receipt is not found', async () => {
    const errorMessage = 'Receipt not found';
    mockedReceiptService.findReceiptPoints.mockImplementation(() => {
      throw new HTTPError(errorMessage, 404);
    });

    await getReceiptPointsController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should return 500 and a generic error message for unexpected errors', async () => {
    const errorMessage = 'Some unexpected error';
    mockedReceiptService.findReceiptPoints.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await getReceiptPointsController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'An unexpected error occurred.',
    });
  });
});
