ALTER TABLE `users` ADD `credits` int DEFAULT 1000 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `creditsUsed` int DEFAULT 0 NOT NULL;