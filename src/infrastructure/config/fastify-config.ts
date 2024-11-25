import Fastify from 'fastify';

export const createFastifyInstance = () => {
  return Fastify({
    logger: true,
    ignoreTrailingSlash: true,
  });
};
