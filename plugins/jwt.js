import fp from 'fastify-plugin'

export default fp(async (server) => {
  server.register(import('@fastify/jwt'), { secret: process.env.JWT_SECRET });

  server.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } 
    catch (err) {
      reply.code(401).send(err);
    }
  });
})