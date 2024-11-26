'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = processReceiptRoute;
const constants_1 = require('../../../../../constants');
const process_receipt_controller_1 = require('../../../../controllers/process-receipt/process-receipt-controller');
const open_api_schema_1 = require('./open-api-schema');
const PROCESS_RECEIPT_URL_PATH = `/${constants_1.API_RECEIPTS_PATH}/${constants_1.API_PROCESS_PATH}`;
/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 */
async function processReceiptRoute(fastify) {
  fastify.post(
    PROCESS_RECEIPT_URL_PATH,
    open_api_schema_1.processReceiptOpenApiSchema,
    process_receipt_controller_1.processReceiptController
  );
}
