import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const registerSwagger = (fastify: FastifyInstance) => {
  // Register Swagger plugin to generate OpenAPI schema
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0', // Added openapi field to define version explicitly
      info: {
        title: 'Receipt Processor',
        description: 'My Fastify API that processes receipts',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3000/v1' }],
      tags: [
        { name: 'receipt', description: 'Receipt related endpoints' },
      ],
    },
  });

  // Register Swagger UI to serve the UI at /docs
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none', // Adjust UI settings here
      deepLinking: false,
    },
  });
};
