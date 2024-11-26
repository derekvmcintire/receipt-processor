import { FastifyInstance } from 'fastify';
import {
  API_POINTS_PATH,
  API_RECEIPTS_PATH,
} from '../../../../../../constants';
import { GetPointsResponse } from '../../../../../../types/http/get-receipt-points';
import { getReceiptPointsController } from '../../../../../controllers/get-receipt-points/get-receipt-points-controller';

const RECEIPT_POINTS_URL_PATH = `/${API_RECEIPTS_PATH}/:id/${API_POINTS_PATH}`;

export default async function getPointsRoute(fastify: FastifyInstance) {
  fastify.get<{
    Params: { id: string };
    Reply: GetPointsResponse;
  }>(
    RECEIPT_POINTS_URL_PATH,
    {
      schema: {
        description: 'Get points for a specific receipt',
        tags: ['receipt'], // This helps with Swagger organization
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Receipt ID',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              points: {
                type: 'integer',
                description: 'Number of points for the receipt',
              },
            },
            required: ['points'],
          },
        },
      },
    },
    getReceiptPointsController
  );
}
