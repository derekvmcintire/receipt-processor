'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerRoutes = void 0;
const route_1 = __importDefault(require('./v1/receipts/process/route'));
const route_2 = __importDefault(require('./v1/receipts/:id/points/route'));
const route_3 = __importDefault(require('./v1/health-check/route'));
const route_4 = __importDefault(require('./v1/open-api/route'));
const constants_1 = require('../../constants');
/**
 * Registers application routes with the Fastify instance.
 * Routes are grouped under versioned prefixes for better API version management.
 *
 * @param {FastifyInstance} fastify - The Fastify server instance to register routes on.
 * @returns {void}
 */
const registerRoutes = (fastify) => {
  fastify.register(route_3.default, {
    prefix: `/${constants_1.API_VERSION_ONE_PREFIX}/`,
  });
  fastify.register(route_4.default, {
    prefix: `/${constants_1.API_VERSION_ONE_PREFIX}/`,
  });
  fastify.register(route_1.default, {
    prefix: `/${constants_1.API_VERSION_ONE_PREFIX}/`,
  });
  fastify.register(route_2.default, {
    prefix: `/${constants_1.API_VERSION_ONE_PREFIX}`,
  });
};
exports.registerRoutes = registerRoutes;
