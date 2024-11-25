import { FastifyInstance } from 'fastify';

export const startServer = async (fastify: FastifyInstance) => {
  fastify.listen(
    { port: 3000, host: '0.0.0.0' },
    (err: Error | null, address: string) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      console.log(`Server listening on: ${address}`);
    }
  );
};
