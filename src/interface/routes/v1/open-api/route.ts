import { FastifyInstance } from 'fastify';

const API_SCHEMA_URL_PATH = `/openapi.json`;

/**
 * Add an endpoint to serve the OpenAPI spec as a JSON file.
 * This allows you to access the OpenAPI spec at `/openapi.json`.
 */
export default async function openApiSchemaRoute(fastify: FastifyInstance) {
  fastify.get(API_SCHEMA_URL_PATH, (_request, reply) => {
    const openapiSpec = fastify.swagger();
    reply.send(openapiSpec);
  });
}
