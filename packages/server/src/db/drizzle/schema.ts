import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('full_name'),
  email: varchar('email').unique(),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  description: text('email'),
  userId: serial('user_id').references(() => users.id),
});