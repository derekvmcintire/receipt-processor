import { FastifyInstance } from 'fastify';
import {
  API_POINTS_PATH,
  API_RECEIPTS_PATH,
} from '../../../../../../constants';
import { GetPointsResponse } from '../../../../../../types/http/get-receipt-points';

/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 */
export default async function getPointsRoute(fastify: FastifyInstance) {
  const routePath = `/${API_RECEIPTS_PATH}/:id/${API_POINTS_PATH}`;

  fastify.get<{ Params: { id: string } }>(routePath, () => {
    // const { id } = request.params;

    const points = 32;
    const response: GetPointsResponse = { points };

    return response;
  });
}
