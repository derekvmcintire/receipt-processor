import { FastifyInstance } from 'fastify';

const HEALTH_CHECK_URL_PATH = `/`;

/**
 * basic health check route at the root ("/").
 * This route is often used for monitoring the server's status.
 */
export default async function healthCheckRoute(fastify: FastifyInstance) {
  fastify.get(HEALTH_CHECK_URL_PATH, () => {
    return { message: 'Receipt Processor API is healthy.' };
  });
}
