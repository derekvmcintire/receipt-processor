import Fastify from 'fastify';
import processReceiptRoute from './interface/routes/v1/receipts/process/route';
import getPointsRoute from './interface/routes/v1/receipts/:id/points/route';
import { API_VERSION_ONE_PREFIX } from './constants';

// Instantiate Fastify
const fastify = Fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

// Basic route to check if Fastify is working
fastify.get('/', async () => {
  return { message: 'Receipt Processor API' };
});

// Register routes
fastify.register(processReceiptRoute, {
  prefix: `/${API_VERSION_ONE_PREFIX}/`,
});
fastify.register(getPointsRoute, {
  prefix: `/${API_VERSION_ONE_PREFIX}`,
});

// Start the server
const start = async () => {
  fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening on: ${address}`);
  });
};

start();
