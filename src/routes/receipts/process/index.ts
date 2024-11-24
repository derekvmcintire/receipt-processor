import { FastifyInstance } from 'fastify';
import { Receipt, PostReceiptResponse } from '../../../types';

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} _options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function processReceiptRoute (fastify: FastifyInstance, _options: Object) {
  fastify.post<{ Body: Receipt }>('/receipts/process', async (_request, _reply) => {
    // const receipt: Receipt = request.body;
  
    const receiptId = '1';
    const response: PostReceiptResponse = { id: receiptId }
  
    return response;
  });
}