CREATE TABLE `authUsers` (
	`id` integer PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`auth_id` integer NOT NULL,
	FOREIGN KEY (`auth_id`) REFERENCES `authUsers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authUsers_email_unique` ON `authUsers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);