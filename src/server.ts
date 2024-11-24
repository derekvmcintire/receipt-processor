import Fastify from 'fastify';
import getPointsRoute from './interface/routes/v1/receipts/:id/points/route';
import processReceiptRoute from './interface/routes/v1/receipts/process/route';

// Instantiate Fastify
const fastify = Fastify({
  logger: true,
});

// Register routes
fastify.register(processReceiptRoute);
fastify.register(getPointsRoute);

// Start the server
const start = async () => {
  // Run the server!
  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
    console.log(`Server listening on: ${address}`);
  });
};

// Start the server
start();
