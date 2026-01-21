import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Saldo atual de créditos do usuário */
  credits: int("credits").default(1000).notNull(),
  /** Total de créditos já consumidos (para estatísticas) */
  creditsUsed: int("creditsUsed").default(0).notNull(),
  /** Indica se o usuário completou o onboarding inicial */
  onboardingCompleted: boolean("onboardingCompleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Projects table - Each project represents a persona/niche
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  persona: varchar("persona", { length: 255 }).notNull(), // Ex: "DJ de Funk", "Expert de Design"
  description: text("description"),
  avatar: text("avatar"), // URL da imagem do avatar
  color: varchar("color", { length: 7 }).default("#3b82f6"), // Cor hex para identificação visual
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * References table - Video references analyzed per project
 */
export const references = mysqlTable("references", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  userId: int("userId").notNull(),
  videoUrl: text("videoUrl").notNull(),
  creatorName: varchar("creatorName", { length: 255 }),
  niche: varchar("niche", { length: 255 }),
  analysis: text("analysis"), // JSON string com a análise completa
  status: mysqlEnum("status", ["processing", "completed", "error"]).default("processing").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Reference = typeof references.$inferSelect;
export type InsertReference = typeof references.$inferInsert;

/**
 * Ideas table - Content ideas generated per project
 */
export const ideas = mysqlTable("ideas", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  viralScore: int("viralScore"), // Score de 0-100
  source: varchar("source", { length: 100 }), // "daily_trends", "manual", etc
  isFavorite: int("isFavorite").default(0).notNull(), // Boolean as int
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Idea = typeof ideas.$inferSelect;
export type InsertIdea = typeof ideas.$inferInsert;

/**
 * Scripts table - Generated scripts per project
 */
export const scripts = mysqlTable("scripts", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  format: varchar("format", { length: 50 }), // "youtube", "shorts", "reels"
  tone: varchar("tone", { length: 100 }), // "educar", "entreter", "inspirar"
  referenceId: int("referenceId"), // Opcional: script baseado em referência específica
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Script = typeof scripts.$inferSelect;
export type InsertScript = typeof scripts.$inferInsert;