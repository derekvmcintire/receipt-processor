import { FastifyInstance } from 'fastify';
import { API_RECEIPTS_PATH, API_PROCESS_PATH } from '../../../../../constants';
import { Receipt } from '../../../../../types/domain/receipt';
import { PostReceiptResponse } from '../../../../../types/http/process-receipt';
import { processReceiptController } from '../../../../controllers/process-receipt/process-receipt-controller';

const PROCESS_RECEIPT_URL_PATH = `/${API_RECEIPTS_PATH}/${API_PROCESS_PATH}`;

export default async function processReceiptRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: Receipt; Reply: PostReceiptResponse }>(
    PROCESS_RECEIPT_URL_PATH,
    {
      schema: {
        description: 'Process a receipt and return an ID.',
        body: {
          // Here, we define the request body schema for the POST request
          type: 'object',
          properties: {
            retailer: { type: 'string' },
            purchaseDate: { type: 'string' },
            purchaseTime: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  shortDescription: { type: 'string' },
                  price: { type: 'string' },
                },
              },
            },
            total: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Successful response with receipt ID',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    processReceiptController
  );
}
