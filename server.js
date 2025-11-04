import fastify from 'fastify'
import dotenv from 'dotenv';
dotenv.config();

const server = fastify({logger: true})

server.register(import('./plugins/postgres.js'));
server.register(import('./plugins/cors.js'));
server.register(import('./plugins/jwt.js'));
server.register(import('./routes/user.route.js'));

server.listen({port: process.env.SERVER_PORT || 8888}, (err, addr) => {
    if (err) {
        console.log('Server Error', err)
        process.exit(1)
    }
    console.log(`Server runs on ${addr}`)
})