import type { FastifyInstance } from "fastify";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../use-case/user.usecase";
import type { User } from "../users.repo";

export const userController = (fastify: FastifyInstance ) => {
    fastify.post('/', async (request, reply) => {
        const user = request.body as User;
        const newUser = await createUser(user);
        return reply.status(201).send(newUser);
    }); 
    fastify.get('/', async (request, reply) => {
        const users = await getAllUsers();
        return reply.status(200).send(users);
    });
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const user = await getUserById(id);
        return reply.status(200).send(user);
    });
    fastify.put('/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const user = request.body as User;
        const updatedUser = await updateUser(id, user);
        return reply.status(200).send(updatedUser);
    });
    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const deletedUser = await deleteUser(id);
        return reply.status(200).send(deletedUser);
    });
}