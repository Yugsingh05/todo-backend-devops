import { eq } from "drizzle-orm";
import db from "../db/db";
import { usersTable } from "../db/schema";

export type User = typeof usersTable.$inferSelect;

export class UsersRepo {
  async findAll() {
    return await db.select().from(usersTable);
  }

  async findById(id: number) {
    return await db.select().from(usersTable).where(eq(usersTable.id, id));
  }

  async create(user: User) {
    return await db.insert(usersTable).values(user).returning();
  }

  async update(id: number, user: Partial<User>) {
    return await db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning();
  }

  async delete(id: number) {
    return await db.delete(usersTable).where(eq(usersTable.id, id));
  }
}

export const usersRepo = new UsersRepo();
