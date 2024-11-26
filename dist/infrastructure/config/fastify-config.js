'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createFastifyInstance = void 0;
const fastify_1 = __importDefault(require('fastify'));
/**
 * Creates and returns a new Fastify instance with custom configurations.
 *
 * @returns {FastifyInstance} The Fastify server instance.
 */
const createFastifyInstance = () => {
  return (0, fastify_1.default)({
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
exports.createFastifyInstance = createFastifyInstance;
