import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import 'dotenv/config';
import { userController } from './src/users/http/user.http';

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world 2' };
});

fastify.register(userController, { prefix: '/users' });

const start = async () => {
  try {
    const PORT = parseInt(process.env.PORT || '3000', 10);
    await fastify.listen({ port: PORT, host: '0.0.0.0' });

    const address = fastify.server.address();
    if (typeof address === 'object' && address !== null) {
      console.log(`🚀 Server listening on http://${address.address}:${address.port}`);
    } else {
      console.log(`🚀 Server listening`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
