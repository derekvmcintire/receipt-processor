import { FastifyInstance } from 'fastify'; // Import FastifyInstance type for type safety
import swagger from '@fastify/swagger'; // Import the Fastify Swagger plugin for OpenAPI support
import swaggerUi from '@fastify/swagger-ui'; // Import the Swagger UI plugin for rendering API docs in the browser

/**
 * Registers Swagger documentation and Swagger UI for the Fastify instance.
 *
 * This function configures the OpenAPI documentation for the API and sets up a route
 * to view it through Swagger UI. This makes it easy to document and interact with
 * the API endpoints for developers and users.
 *
 * @param fastify - The Fastify instance to register the plugins with.
 */
export async function registerSwagger(fastify: FastifyInstance) {
  // Register the swagger plugin, this generates the openApi json spec
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Receipt Processor',
        description: 'My Fastify API that processes receipts',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000/v1', // The base URL for the API, where 'v1' is the version
        },
      ],
      tags: [{ name: 'Receipt', description: '/receipt' }],
    },
  });

  // Register the Swagger UI plugin to serve the interactive documentation interface
  await fastify.register(swaggerUi, {
    routePrefix: '/docs', // The route where Swagger UI will be available
    uiConfig: {
      deepLinking: true, // Allow linking directly to specific parts of the documentation
    },
  });
}
