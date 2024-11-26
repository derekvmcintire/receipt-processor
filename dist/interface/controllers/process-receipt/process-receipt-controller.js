'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.processReceiptController = processReceiptController;
const receipt_service_factory_1 = require('../../../application/core/domain/services/receipt-service-factory');
const http_error_1 = require('../../errors/http-error');
/**
 * Controller function for processing a receipt.
 * This is the handler for processing receipt-related requests.
 * It receives the receipt data from the request body, processes it,
 * and returns a response with the generated receipt ID or an error message.
 *
 * @param {FastifyRequest} request - Fastify request object containing the receipt data in the body.
 * @param {FastifyReply} reply - Fastify reply object used to send the response back to the client.
 */
async function processReceiptController(request, reply) {
  try {
    const receipt = request.body;
    const receiptService = (0, receipt_service_factory_1.getReceiptService)();
    const receiptId = receiptService.processReceipt(receipt);
    // HTTP status 201 if saving the receipt is successfull
    reply.status(201).send({ id: receiptId });
  } catch (error) {
    if (error instanceof http_error_1.HTTPError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'An unexpected error occurred.' });
    }
  }
}
