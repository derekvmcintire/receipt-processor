import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const versionRedirectHook = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const versionedRoute = /^\/v\d+\//.test(request.url);
  if (!versionedRoute) {
    reply.redirect('/v1' + request.url);
  } else {
    done();
  }
};
