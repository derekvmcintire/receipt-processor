import { FastifyInstance } from 'fastify';
import processReceiptRoute from './v1/receipts/process/route';
import getPointsRoute from './v1/receipts/:id/points/route';
import healthCheckRoute from './v1/health-check/route';
import openApiSchemaRoute from './v1/open-api/route';
import { API_VERSION_ONE_PREFIX } from '../../constants';

/**
 * Registers application routes with the Fastify instance.
 * Routes are grouped under versioned prefixes for better API version management.
 *
 * @param {FastifyInstance} fastify - The Fastify server instance to register routes on.
 * @returns {void}
 */
export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthCheckRoute, {
    prefix: `/${API_VERSION_ONE_PREFIX}/`,
  });

  fastify.register(openApiSchemaRoute, {
    prefix: `/${API_VERSION_ONE_PREFIX}/`,
  });

  fastify.register(processReceiptRoute, {
    prefix: `/${API_VERSION_ONE_PREFIX}/`,
  });

  fastify.register(getPointsRoute, {
    prefix: `/${API_VERSION_ONE_PREFIX}`,
  });
};
