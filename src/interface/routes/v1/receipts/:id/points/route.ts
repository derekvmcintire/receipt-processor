import { FastifyInstance } from 'fastify';
import {
  API_POINTS_PATH,
  API_RECEIPTS_PATH,
} from '../../../../../../constants';
import { GetPointsResponse } from '../../../../../../types/http/get-receipt-points';

/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} _options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function getPointsRoute(
  fastify: FastifyInstance,
  _options: Object
) {
  const routePath = `/${API_RECEIPTS_PATH}/:id/${API_POINTS_PATH}`;

  fastify.get<{ Params: { id: string } }>(
    routePath,
    async (_request, _reply) => {
      // const { id } = request.params;

      const points = 32;
      const response: GetPointsResponse = { points };

      return response;
    }
  );
}
