import { FastifyInstance } from 'fastify';
import {
  API_POINTS_PATH,
  API_RECEIPTS_PATH,
} from '../../../../../../constants';
import { GetPointsResponse } from '../../../../../../types/http/get-receipt-points';
import { getReceiptPointsController } from '../../../../../controllers/get-receipt-points/get-receipt-points-controller';
import { receiptPointsOpenApiSchema } from './open-api-schema';

const RECEIPT_POINTS_URL_PATH = `/${API_RECEIPTS_PATH}/:id/${API_POINTS_PATH}`;

export default async function getPointsRoute(fastify: FastifyInstance) {
  fastify.get<{
    Params: { id: string };
    Reply: GetPointsResponse;
  }>(
    RECEIPT_POINTS_URL_PATH,
    receiptPointsOpenApiSchema,
    getReceiptPointsController
  );
}
