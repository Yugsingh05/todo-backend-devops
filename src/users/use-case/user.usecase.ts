import type { User } from "../users.repo";
import { usersRepo } from "../users.repo";

export const createUser = async (user: User) => {
    try {
        const newUser = await usersRepo.create(user);
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to create user");
    }
}

export const getAllUsers = async () => {
    try {
        const users = await usersRepo.findAll();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to get all users");
    }
}

export const getUserById = async (id: number) => {
    try {
        const user = await usersRepo.findById(id);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to get user by id");
    }
}

export const updateUser = async (id: number, user: User) => {
    try {
        const updatedUser = await usersRepo.update(id, user);
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to update user");
    }
}

export const deleteUser = async (id: number) => {
    try {
        const deletedUser = await usersRepo.delete(id);
        return deletedUser;
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Failed to delete user");
    }
}