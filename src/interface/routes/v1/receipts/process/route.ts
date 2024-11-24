import { FastifyInstance } from 'fastify';
import { Receipt } from '../../../../../types/domain/receipt';
import { PostReceiptResponse } from '../../../../../types/http/process-receipt';
import { API_PROCESS_PATH, API_RECEIPTS_PATH } from '../../../../../constants';

/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} _options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function processReceiptRoute(
  fastify: FastifyInstance,
  _options: Object
) {
  const routePath = `/${API_RECEIPTS_PATH}/${API_PROCESS_PATH}`;

  fastify.post<{ Body: Receipt }>(routePath, async (_request, _reply) => {
    // const receipt: Receipt = request.body;

    const receiptId = '1';
    const response: PostReceiptResponse = { id: receiptId };

    return response;
  });
}
