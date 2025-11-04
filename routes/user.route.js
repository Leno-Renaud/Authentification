import { handleRegister, handleLogin, handleMe } from '../controller/user.controller.js';

export default async function routes(fastify) {
    fastify.post('/login', handleLogin);
    fastify.post('/register', handleRegister);
    fastify.get('/me', { preHandler: [fastify.authenticate] }, handleMe);
}