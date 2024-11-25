import { FastifyInstance } from 'fastify';

/**
 * Starts the Fastify server and listens for incoming requests.
 *
 * @param {FastifyInstance} fastify - The Fastify instance to start.
 * @returns {Promise<void>} A promise that resolves when the server starts.
 */
export const startServer = async (fastify: FastifyInstance) => {
  // Listen on port 3000 and bind to all network interfaces (0.0.0.0)
  fastify.listen(
    { port: 3000, host: '0.0.0.0' },
    (err: Error | null, address: string) => {
      if (err) {
        // Log the error and terminate the process if the server fails to start
        fastify.log.error(err);
        process.exit(1);
      }
      // Log the server's address once it starts successfully
      console.log(`Server listening on: ${address}`);
    }
  );
};
