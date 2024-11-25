import { registerRoutes } from './interface/routes';
import { createFastifyInstance } from './infrastructure/config/fastify-config';
import { startServer } from './infrastructure/config/server-config';
import { versionRedirectHook } from './interface/hooks/version-redirect-hook';

/**
 * Instantiate the Fastify server instance with custom configuration.
 * This is the core server instance used to handle all incoming requests.
 */
const fastify = createFastifyInstance();

/**
 * Define a basic health check route at the root ("/").
 * This route is often used for monitoring the server's status.
 */
fastify.get('/', async () => {
  return { message: 'Receipt Processor API' };
});

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
