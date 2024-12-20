import { registerRoutes } from './interface/routes';
import { createFastifyInstance } from './infrastructure/config/fastify-config';
import { startServer } from './infrastructure/config/server-config';
import { versionRedirectHook } from './interface/hooks/version-redirect-hook';
import { registerSwagger } from './infrastructure/config/swagger-config';

/**
 * Instantiate the Fastify server instance with custom configuration.
 * This is the core server instance used to handle all incoming requests.
 */
const fastify = createFastifyInstance();

/**
 * Register the Swagger documentation for the API.
 * This function integrates the Fastify Swagger plugin, which generates and serves
 * API documentation based on the defined routes and their associated JSDoc comments.
 *
 * The Swagger documentation is accessible at the '/docs' route (adjusted from '/documentation'),
 * This documentation includes information like:
 * - Available endpoints and their HTTP methods
 * - Request and response formats
 * - Parameter descriptions
 * - Response status codes and descriptions
 */
registerSwagger(fastify);

/**
 * Register all routes for the application.
 * This function will add routes defined in the 'registerRoutes' module to the Fastify server.
 */
registerRoutes(fastify);

/**
 * Register hooks for the Fastify instance.
 * In this case, the 'onRequest' hook is used to perform actions (e.g., redirects)
 * before processing incoming requests.
 */
fastify.addHook('onRequest', versionRedirectHook);

/**
 * Start the Fastify server and begin listening for incoming requests.
 * The 'startServer' function is responsible for binding the server to a port.
 */
startServer(fastify);
