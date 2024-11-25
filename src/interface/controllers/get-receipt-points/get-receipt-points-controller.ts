import { FastifyReply, FastifyRequest } from 'fastify';
import { getReceiptService } from '../../../application/core/domain/services/receipt-service-factory';
import { HTTPError } from '../../errors/http-error';
import { GetPointsResponse } from '../../../types/http/get-receipt-points';

/**
 * Controller for handling the "get receipt points" API request.
 *
 * This function retrieves the points for a specific receipt by its ID,
 * using the `ReceiptService` to process the request. If the receipt ID
 * is valid, it returns the points associated with the receipt. If an error
 * occurs, an appropriate error message is returned.
 *
 * @param {FastifyRequest} request - The incoming HTTP request, which includes the receipt ID in the URL parameters.
 * @param {FastifyReply} reply - The Fastify reply object used to send the response to the client.
 *
 * @returns {Promise<void>} A promise that resolves when the response has been sent.
 */
export async function getReceiptPointsController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = request.params;
    const receiptService = getReceiptService();
    const response = receiptService.findReceiptPoints(id);

    reply.status(200).send(response as GetPointsResponse);
  } catch (error) {
    if (error instanceof HTTPError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'An unexpected error occurred.' });
    }
  }
}
