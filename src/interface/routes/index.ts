import { FastifyInstance } from 'fastify';
import processReceiptRoute from './v1/receipts/process/route';
import getPointsRoute from './v1/receipts/:id/points/route';
import { API_VERSION_ONE_PREFIX } from '../../constants';

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(processReceiptRoute, {
    prefix: `/${API_VERSION_ONE_PREFIX}/`,
  });
  fastify.register(getPointsRoute, { prefix: `/${API_VERSION_ONE_PREFIX}` });
};
