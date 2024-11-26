import { FastifyInstance } from 'fastify';

/**
 * Starts the Fastify server and listens for incoming requests.
 *
 * @param {FastifyInstance} fastify - The Fastify instance to start.
 * @returns {Promise<void>} A promise that resolves when the server starts.
 */
export const startServer = async (fastify: FastifyInstance) => {
  try {
    // Wait for Fastify to be fully ready, including all plugins (Swagger, etc.)
    await fastify.ready();

    // logging the openapi schema on start up
    const openapiSchema = fastify.swagger();
    console.log('OpenAPI Schema:', openapiSchema);

    // start the server after everything is ready
    const address = await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on: ${address}`);
  } catch (err) {
    // If there’s any error during startup (including plugin registration)
    fastify.log.error(err);
    process.exit(1);
  }
};
