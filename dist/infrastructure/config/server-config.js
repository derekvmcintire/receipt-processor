'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.startServer = void 0;
/**
 * Starts the Fastify server and listens for incoming requests.
 *
 * @param {FastifyInstance} fastify - The Fastify instance to start.
 * @returns {Promise<void>} A promise that resolves when the server starts.
 */
const startServer = async (fastify) => {
  try {
    // Wait for Fastify to be fully ready, including all plugins (Swagger, etc.)
    await fastify.ready();
    // start the server after everything is ready
    const address = await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`NEW: Server listening on: ${address}`);
  } catch (err) {
    // If there’s any error during startup (including plugin registration)
    fastify.log.error(err);
    process.exit(1);
  }
};
exports.startServer = startServer;
