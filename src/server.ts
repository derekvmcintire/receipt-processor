import { registerRoutes } from './interface/routes';
import { createFastifyInstance } from './infrastructure/config/fastify-config';
import { startServer } from './infrastructure/config/server-config';
import { versionRedirectHook } from './interface/hooks/version-redirect-hook';

// Instantiate Fastify
const fastify = createFastifyInstance();

// Basic health check route
fastify.get('/', async () => {
  return { message: 'Receipt Processor API' };
});

// Register routes
registerRoutes(fastify);

// Register hooks
fastify.addHook('onRequest', versionRedirectHook);

// Start the server
startServer(fastify);
