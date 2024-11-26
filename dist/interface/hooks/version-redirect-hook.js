'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.versionRedirectHook = void 0;
/**
 * A Fastify hook that redirects requests to the correct API version.
 * If the request URL does not have a version prefix (e.g., `/v1/`), it will redirect
 * the client to the same URL with the `/v1` prefix.
 *
 * @param {FastifyRequest} request - The incoming HTTP request.
 * @param {FastifyReply} reply - The Fastify reply object used to send a response.
 * @param {HookHandlerDoneFunction} done - The callback function to call when the hook has finished.
 */
const versionRedirectHook = (request, reply, done) => {
  // Exclude the /docs or /v1/docs route from version redirection
  if (request.url.startsWith('/docs')) {
    done(); // Don't redirect for Swagger UI
    return;
  }
  // Check if the request URL already includes a version prefix (e.g., /v1/)
  const versionedRoute = /^\/v\d+\//.test(request.url);
  if (!versionedRoute) {
    reply.redirect('/v1' + request.url);
  } else {
    done();
  }
};
exports.versionRedirectHook = versionRedirectHook;
