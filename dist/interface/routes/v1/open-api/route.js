'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = openApiSchemaRoute;
const API_SCHEMA_URL_PATH = `/openapi.json`;
/**
 * Add an endpoint to serve the OpenAPI spec as a JSON file.
 * This allows you to access the OpenAPI spec at `/openapi.json`.
 */
async function openApiSchemaRoute(fastify) {
  fastify.get(API_SCHEMA_URL_PATH, (_request, reply) => {
    const openapiSpec = fastify.swagger();
    reply.send(openapiSpec);
  });
}
