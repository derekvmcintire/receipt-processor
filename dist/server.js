'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const routes_1 = require('./interface/routes');
const fastify_config_1 = require('./infrastructure/config/fastify-config');
const server_config_1 = require('./infrastructure/config/server-config');
const version_redirect_hook_1 = require('./interface/hooks/version-redirect-hook');
const swagger_config_1 = require('./infrastructure/config/swagger-config');
/**
 * Instantiate the Fastify server instance with custom configuration.
 * This is the core server instance used to handle all incoming requests.
 */
const fastify = (0, fastify_config_1.createFastifyInstance)();
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
(0, swagger_config_1.registerSwagger)(fastify);
/**
 * Register all routes for the application.
 * This function will add routes defined in the 'registerRoutes' module to the Fastify server.
 */
(0, routes_1.registerRoutes)(fastify);
/**
 * Register hooks for the Fastify instance.
 * In this case, the 'onRequest' hook is used to perform actions (e.g., redirects)
 * before processing incoming requests.
 */
fastify.addHook('onRequest', version_redirect_hook_1.versionRedirectHook);
/**
 * Start the Fastify server and begin listening for incoming requests.
 * The 'startServer' function is responsible for binding the server to a port.
 */
(0, server_config_1.startServer)(fastify);
