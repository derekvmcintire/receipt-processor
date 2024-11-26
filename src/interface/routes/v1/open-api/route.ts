import { FastifyInstance } from 'fastify';

const API_SCHEMA_URL_PATH = `/openapi.json`;

/**
 * basic health check route at the root ("/").
 * This route is often used for monitoring the server's status.
 */
export default async function openApiSchemaRoute(fastify: FastifyInstance) {
  fastify.get(API_SCHEMA_URL_PATH, (_request, reply) => {
    const openapiSpec = fastify.swagger();
    reply.send(openapiSpec);
  });
}
