import { FastifyInstance } from 'fastify';
import { API_RECEIPTS_PATH, API_PROCESS_PATH } from '../../../../../constants';
import { Receipt } from '../../../../../types/domain/receipt';
import { PostReceiptResponse } from '../../../../../types/http/process-receipt';
import { processReceiptController } from '../../../../controllers/process-receipt/process-receipt-controller';
import { processReceiptOpenApiSchema } from './open-api-schema';

const PROCESS_RECEIPT_URL_PATH = `/${API_RECEIPTS_PATH}/${API_PROCESS_PATH}`;

/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 */
export default async function processReceiptRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: Receipt; Reply: PostReceiptResponse }>(
    PROCESS_RECEIPT_URL_PATH,
    processReceiptOpenApiSchema,
    processReceiptController
  );
}
