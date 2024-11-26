'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = getPointsRoute;
const constants_1 = require('../../../../../../constants');
const get_receipt_points_controller_1 = require('../../../../../controllers/get-receipt-points/get-receipt-points-controller');
const open_api_schema_1 = require('./open-api-schema');
const RECEIPT_POINTS_URL_PATH = `/${constants_1.API_RECEIPTS_PATH}/:id/${constants_1.API_POINTS_PATH}`;
/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 */
async function getPointsRoute(fastify) {
  fastify.get(
    RECEIPT_POINTS_URL_PATH,
    open_api_schema_1.receiptPointsOpenApiSchema,
    get_receipt_points_controller_1.getReceiptPointsController
  );
}
