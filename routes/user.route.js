import { handleRegister, handleLogin } from '../controller/user.controller.js';

export default async function routes(fastify) {
    fastify.post('/login', handleLogin);
    fastify.post('/register', handleRegister);
}