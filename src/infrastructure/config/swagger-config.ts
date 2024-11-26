import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export async function registerSwagger(fastify: FastifyInstance) {
  // Register Swagger
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Receipt Processor',
        description: 'My Fastify API that processes receipts',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000/v1',
        },
      ],
      tags: [{ name: 'receipt', description: 'Receipt related endpoints' }],
    },
    // Remove the 'mode' property and use standard OpenAPI options
    transform: (schema) => {
      // Optional: Add custom schema transformations if needed
      return schema;
    },
  });

  // Register Swagger UI
  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: true,
    },
  });
}
