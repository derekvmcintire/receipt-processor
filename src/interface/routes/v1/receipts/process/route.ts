import { FastifyInstance } from 'fastify';
import { API_PROCESS_PATH, API_RECEIPTS_PATH } from '../../../../../constants';
import { Receipt } from '../../../../../types/domain/receipt';
import { PostReceiptResponse } from '../../../../../types/http/process-receipt';
import { processReceiptController } from '../../../../controllers/receipt-controller';

const PROCESS_RECEIPT_URL_PATH = `/${API_RECEIPTS_PATH}/${API_PROCESS_PATH}`;

/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} _options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function processReceiptRoute(
  fastify: FastifyInstance,
  _options: Object
) {
  fastify.post<{ Body: Receipt; Reply: PostReceiptResponse }>(
    PROCESS_RECEIPT_URL_PATH,
    processReceiptController
  );
}
