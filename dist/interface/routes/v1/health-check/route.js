'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = healthCheckRoute;
const HEALTH_CHECK_URL_PATH = `/`;
/**
 * basic health check route at the root ("/").
 * This route is often used for monitoring the server's status.
 */
async function healthCheckRoute(fastify) {
  fastify.get(HEALTH_CHECK_URL_PATH, () => {
    return { message: 'Receipt Processor API is healthy.' };
  });
}
