import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("full_name"),
	email: varchar("email").unique(),
	user_id: varchar("user_id").unique(),
});

export const events = pgTable("events", {
	id: serial("id").primaryKey(),
	name: varchar("name"),
	description: text("email"),
	user_id: serial("user_id").references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => ({
	events: many(events),
}));

export const eventsRelations = relations(events, ({ one }) => ({
	user: one(users, {
		fields: [events.user_id],
		references: [users.id],
	}),
}));
