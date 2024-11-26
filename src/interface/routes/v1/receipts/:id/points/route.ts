import { FastifyInstance } from 'fastify';
import { API_POINTS_PATH, API_RECEIPTS_PATH } from '../../../../../../constants';
import { GetPointsResponse } from '../../../../../../types/http/get-receipt-points';
import { getReceiptPointsController } from '../../../../../controllers/get-receipt-points/get-receipt-points-controller';

const RECEIPT_POINTS_URL_PATH = `/${API_RECEIPTS_PATH}/:id/${API_POINTS_PATH}`;

export default async function getPointsRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string }; Reply: GetPointsResponse }>(
    RECEIPT_POINTS_URL_PATH,
    {
      schema: {
        description: 'Retrieve the points for the specified receipt ID.',
        tags: ['receipt'],
        params: { // Here, we define the parameters in the URL path
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Successful response with points',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    points: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getReceiptPointsController
  );
}
