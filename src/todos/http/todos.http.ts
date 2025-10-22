import type { FastifyInstance } from "fastify";
import type { Todo, TodoStatus } from "../todo.repo";
import { CreateTodo, deleteTodo, getAllTodos, getTodoById, updateTodo, UpdateTodoStatus } from "../use-case/todos.usecase";

export const todosController = (fastify: FastifyInstance ) => {
    fastify.post('/', async (request, reply) => {
        const todo = request.body as Todo;
        const newTodo = await CreateTodo(todo);
        return reply.status(201).send(newTodo);
    });
    fastify.get('/', async (request, reply) => {
        const todos = await getAllTodos();
        return reply.status(200).send(todos);
    });
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const todo = await getTodoById(id);
        return reply.status(200).send(todo);
    });
    fastify.put('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const todo = request.body as Todo;
        const updatedTodo = await updateTodo(id, todo);
        return reply.status(200).send(updatedTodo);
    });
    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const deletedTodo = await deleteTodo(id);
        return reply.status(200).send(deletedTodo);
    });

    fastify.put('/:id/status', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { status } = request.body as { status: TodoStatus };
        const updatedTodo = await UpdateTodoStatus(id, status);
        return reply.status(200).send(updatedTodo);
    });
}