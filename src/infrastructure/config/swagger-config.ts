import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const registerSwagger = async (fastify: FastifyInstance) => {
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

  await fastify.ready()
  fastify.swagger()
};

export const swaggerExample = async (fastify: FastifyInstance) => {

await fastify.register(require('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' }
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
})

fastify.put('/some-route/:id', {
  schema: {
    description: 'post some data',
    tags: ['user', 'code'],
    summary: 'qwerty',
    security: [{ apiKey: [] }],
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'user id'
        }
      }
    },
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
        obj: {
          type: 'object',
          properties: {
            some: { type: 'string' }
          }
        }
      }
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      },
      default: {
        description: 'Default response',
        type: 'object',
        properties: {
          foo: { type: 'string' }
        }
      }
    }
  }
}, (req, reply) => { })

await fastify.ready()
fastify.swagger()
}
