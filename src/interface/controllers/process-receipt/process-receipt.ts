import { FastifyReply, FastifyRequest } from 'fastify';
import { Receipt } from '../../../types/domain/receipt';
import { getReceiptService } from '../../../application/core/domain/services/receipt-service-factory';
import { PostReceiptResponse } from '../../../types/http/process-receipt';
import { HTTPError } from '../../errors/http-error';

/**
 * Controller function for processing a receipt.
 * This is the handler for processing receipt-related requests.
 * It receives the receipt data from the request body, processes it,
 * and returns a response with the generated receipt ID or an error message.
 *
 * @param {FastifyRequest} request - Fastify request object containing the receipt data in the body.
 * @param {FastifyReply} reply - Fastify reply object used to send the response back to the client.
 */
export async function processReceiptController(
  request: FastifyRequest<{ Body: Receipt }>,
  reply: FastifyReply
) {
  try {
    const receipt = request.body;
    const receiptService = getReceiptService();
    const receiptId = receiptService.processReceipt(receipt);

    // HTTP status 201 if saving the receipt is successfull
    reply.status(201).send({ id: receiptId } as PostReceiptResponse);
  } catch (error) {
    if (error instanceof HTTPError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'An unexpected error occurred.' });
    }
  }
}
