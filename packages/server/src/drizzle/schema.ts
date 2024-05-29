import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('full_name'),
  email: varchar('email'),
});