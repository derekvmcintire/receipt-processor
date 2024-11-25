import Fastify, { FastifyInstance } from 'fastify';

/**
 * Creates and returns a new Fastify instance with custom configurations.
 *
 * @returns {FastifyInstance} The Fastify server instance.
 */
export const createFastifyInstance = (): FastifyInstance => {
  return Fastify({
    /**
     * Enable logging for incoming requests and server activity.
     * This is helpful for debugging and monitoring.
     */
    logger: true,

    /**
     * Ignore trailing slashes in the URL path.
     * Routes like '/route' and '/route/' will be treated as equivalent.
     */
    ignoreTrailingSlash: true,
  });
};
