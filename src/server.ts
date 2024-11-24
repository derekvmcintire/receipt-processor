import Fastify from 'fastify';
import { GetReceiptResponse, PostReceiptResponse, Receipt } from './types';

const fastify = Fastify({
  logger: true,
});

// Basic route to check if Fastify is working
fastify.get('/', async (_request, _reply) => {
  return { message: 'Receipt Processor API' };
});

// Basic POST route
fastify.post<{ Body: Receipt }>('/receipts/process', async (_request, _reply) => {
  // const receipt: Receipt = request.body;

  const receiptId = '1';
  const response: PostReceiptResponse = { id: receiptId }

  return response;
});

// Basic GET route
fastify.get<{ Params: { id: string } }>('/receipts/:id/points', async (_request, _reply) => {
  // const { id } = request.params;

  const points = 32;
  const response: GetReceiptResponse = { points }

  return response;
});

// Start the server
const start = async () => {
    // Run the server!
  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
    console.log(`Server listening on: ${address}`);
  })
};

start();
