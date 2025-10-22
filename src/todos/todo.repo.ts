import { eq } from "drizzle-orm";
import db from "../db/db";
import { todosTable, todoStatus } from "../db/schema";

export type Todo = typeof todosTable.$inferSelect;
export type TodoStatus = (typeof todoStatus.enumValues)[number];

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
  async update(id: string, todo: Partial<Todo>) {
    // Handle completedAt conversion - if it's a string, convert to Date or null
    const updateData = { ...todo };
    if (updateData.completedAt !== undefined) {
      if (updateData.completedAt === null) {
        updateData.completedAt = null;
      } else if (typeof updateData.completedAt === "string") {
        updateData.completedAt = new Date(updateData.completedAt);
      }
    }

    return await db
      .update(todosTable)
      .set(updateData)
      .where(eq(todosTable.id, id))
      .returning();
  }
  async delete(id: string) {
    return await db.delete(todosTable).where(eq(todosTable.id, id));
  }
  async updateStatus(id: string, status: TodoStatus) {
    return await db
      .update(todosTable)
      .set({ status: status as TodoStatus })
      .where(eq(todosTable.id, id))
      .returning();
  }
}

export const todoRepo = new TodoRepo();
