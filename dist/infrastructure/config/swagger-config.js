'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerSwagger = registerSwagger;
const swagger_1 = __importDefault(require('@fastify/swagger')); // Import the Fastify Swagger plugin for OpenAPI support
const swagger_ui_1 = __importDefault(require('@fastify/swagger-ui')); // Import the Swagger UI plugin for rendering API docs in the browser
/**
 * Registers Swagger documentation and Swagger UI for the Fastify instance.
 *
 * This function configures the OpenAPI documentation for the API and sets up a route
 * to view it through Swagger UI. This makes it easy to document and interact with
 * the API endpoints for developers and users.
 *
 * @param fastify - The Fastify instance to register the plugins with.
 */
async function registerSwagger(fastify) {
  // Register the swagger plugin, this generates the openApi json spec
  await fastify.register(swagger_1.default, {
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
  await fastify.register(swagger_ui_1.default, {
    routePrefix: '/docs', // The route where Swagger UI will be available
    uiConfig: {
      deepLinking: true, // Allow linking directly to specific parts of the documentation
    },
  });
}
