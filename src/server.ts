import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

// Basic route to check if Fastify is working
fastify.get('/', async (_request, _reply) => {
  return { message: 'Receipt Processor API' };
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
