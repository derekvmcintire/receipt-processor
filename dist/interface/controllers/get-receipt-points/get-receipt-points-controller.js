'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getReceiptPointsController = getReceiptPointsController;
const receipt_service_factory_1 = require('../../../application/core/domain/services/receipt-service-factory');
const http_error_1 = require('../../errors/http-error');
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
async function getReceiptPointsController(request, reply) {
  try {
    const { id } = request.params;
    const receiptService = (0, receipt_service_factory_1.getReceiptService)();
    const response = receiptService.findReceiptPoints(id);
    reply.status(200).send(response);
  } catch (error) {
    if (error instanceof http_error_1.HTTPError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'An unexpected error occurred.' });
    }
  }
}
