import type { Todo, TodoStatus } from "../todo.repo";
import { todoRepo } from "../todo.repo";

export const CreateTodo = async (todo : Todo) => {
    try {
        const newTodo = await todoRepo.create(todo);
        return newTodo;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to create todo");
    }
}

export const getAllTodos = async () => {
    try {
        const todos = await todoRepo.findAll();
        return todos;
    } catch (error) {
        console.error(error);
            throw new Error(error instanceof Error ? error.message : "Failed to get all todos");
    }
}

export const getTodoById = async (id: string) => {
    try {
        const todo = await todoRepo.findById(id);
        return todo;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to get todo by id");
    }
}

export const updateTodo = async (id: string, todo: Todo) => {
    try {
        const updatedTodo = await todoRepo.update(id, todo);
        return updatedTodo;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to update todo");
    }
}

export const deleteTodo = async (id: string) => {
    try {
        const deletedTodo = await todoRepo.delete(id);
        return deletedTodo;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to delete todo");
    }
}

export const UpdateTodoStatus = async (id: string, status: TodoStatus) => {
    try {
        const updatedTodo = await todoRepo.updateStatus(id, status as TodoStatus);
        return updatedTodo;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to update todo status");
    }
}