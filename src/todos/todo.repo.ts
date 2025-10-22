import { eq } from "drizzle-orm";
import db from "../db/db";
import { todosTable } from "../db/schema";

export type Todo = typeof todosTable.$inferSelect;

export class TodoRepo {
    async findAll() {
        return await db.select().from(todosTable);
    }
    async findById(id: string) {
        return await db.select().from(todosTable).where(eq(todosTable.id, id));
    }
    async create(todo: Todo) {
        return await db.insert(todosTable).values(todo).returning();
    }
    async update(id: string, todo: Todo) {
        return await db.update(todosTable).set(todo).where(eq(todosTable.id, id)).returning();
    }
    async delete(id: string) {
        return await db.delete(todosTable).where(eq(todosTable.id, id));
    }
}