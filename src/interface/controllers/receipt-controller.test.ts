import { FastifyReply, FastifyRequest } from 'fastify';
import { ReceiptService } from '../../application/core/domain/services/receipt-service';
import { HTTPError } from '../errors/http-error';
import { Receipt } from '../../types/domain/receipt';
import { IReceiptService } from '../../application/core/domain/services/receipt-service';
import { processReceiptController } from './receipt-controller';

// Mock the ReceiptService class directly
jest.mock('../../application/core/domain/services/receipt-service', () => ({
  ReceiptService: jest.fn(),
}));

describe('processReceiptController', () => {
  let reply: FastifyReply;
  let request: FastifyRequest<{ Body: Receipt }>;
  let mockedReceiptService: jest.Mocked<IReceiptService>;  // Explicitly typed as jest.Mocked<IReceiptService>

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Create a mock response object
    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    // Create a mock request object with a sample receipt body
    request = {
      body: {
        retailer: 'Target',
        purchaseDate: '2023-11-23',
        purchaseTime: '14:00',
        items: [
          { shortDescription: 'Mountain Dew', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
        ],
        total: '18.74',
      } as Receipt,
    } as FastifyRequest<{ Body: Receipt }>;

    // Create a mocked instance of IReceiptService, but this time using jest.Mocked for correct typing
    mockedReceiptService = {
      processReceipt: jest.fn().mockReturnValue('12345'), // Mock processReceipt to return a receipt ID
      validateReceipt: jest.fn(),
      calculatePoints: jest.fn(),
      saveReceipt: jest.fn(),
    };

    // Mock the ReceiptService constructor to return the mocked service instance
    (ReceiptService as jest.Mock).mockImplementation(() => mockedReceiptService);
  });

  it('should return 201 and the receipt ID when the receipt is successfully processed', async () => {
    // Act: call the controller
    await processReceiptController(request, reply);

    // Assert: Verify the response status and sent data
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({ id: '12345' });
  });

  it('should return 400 and an error message when HTTPError is thrown', async () => {
    // Arrange: mock processReceipt to throw an HTTPError
    const errorMessage = 'Invalid receipt data';
    mockedReceiptService.processReceipt.mockImplementation(() => {
      throw new HTTPError(errorMessage, 400);
    });

    // Act: call the controller
    await processReceiptController(request, reply);

    // Assert: Verify the response status and sent error message
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should return 500 and a generic error message for unexpected errors', async () => {
    // Arrange: mock processReceipt to throw an unexpected error
    const errorMessage = 'Some unexpected error';
    mockedReceiptService.processReceipt.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act: call the controller
    await processReceiptController(request, reply);

    // Assert: Verify the response status and sent generic error message
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({ error: 'An unexpected error occurred.' });
  });
});
