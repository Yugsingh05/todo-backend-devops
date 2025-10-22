import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const todoStatus = pgEnum("todo_status", ["pending", "in_progress", "completed"]); 

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const todosTable = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  completed: boolean().notNull().default(false),
  assignedTo: integer().references(() => usersTable.id),
  status: todoStatus("pending").notNull().default("pending"),
  createdAt: timestamp().notNull().defaultNow(),
  completedAt: timestamp(),
});