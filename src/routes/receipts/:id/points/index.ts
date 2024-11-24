import { FastifyInstance } from 'fastify';
import { GetReceiptResponse } from '../../../../types';

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} _options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function getPointsRoute(
  fastify: FastifyInstance,
  _options: Object
) {
  fastify.get<{ Params: { id: string } }>(
    '/receipts/:id/points',
    async (_request, _reply) => {
      // const { id } = request.params;

      const points = 32;
      const response: GetReceiptResponse = { points };

      return response;
    }
  );
}
