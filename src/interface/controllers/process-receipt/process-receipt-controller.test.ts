import { FastifyReply, FastifyRequest } from 'fastify';
import { getReceiptService } from '../../../application/core/domain/services/receipt-service-factory';
import { HTTPError } from '../../errors/http-error';
import { Receipt, mockReceipt } from '../../../types/domain/receipt';
import { processReceiptController } from './process-receipt-controller';
import { IReceiptService } from '../../../application/core/domain/services/receipt-service-interface';

jest.mock(
  '../../../application/core/domain/services/receipt-service-factory',
  () => ({
    getReceiptService: jest.fn(),
  })
);

describe('processReceiptController', () => {
  let mockReply: FastifyReply;
  let mockRequest: FastifyRequest<{ Body: Receipt }>;
  let mockedReceiptService: jest.Mocked<IReceiptService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    mockRequest = {
      body: mockReceipt,
    } as FastifyRequest<{ Body: Receipt }>;

    mockedReceiptService = {
      processReceipt: jest.fn().mockReturnValue('12345'), // Mock processReceipt to return a receipt ID
      findReceiptPoints: jest.fn(),
    };

    // Mock the getReceiptService factory function to return the mocked ReceiptService
    (getReceiptService as jest.Mock).mockReturnValue(mockedReceiptService);
  });

  it('should return 201 and the receipt ID when the receipt is successfully processed', async () => {
    processReceiptController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({ id: '12345' });
  });

  it('should return 400 and an error message when HTTPError is thrown', async () => {
    const errorMessage = 'Invalid receipt data';
    mockedReceiptService.processReceipt.mockImplementation(() => {
      throw new HTTPError(errorMessage, 400);
    });

    processReceiptController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should return 500 and a generic error message for unexpected errors', async () => {
    const errorMessage = 'Some unexpected error';
    mockedReceiptService.processReceipt.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    processReceiptController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'An unexpected error occurred.',
    });
  });
});
