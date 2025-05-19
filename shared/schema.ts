import { pgTable, text, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  company: text("company").notNull(),
  price: integer("price").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("JPY"),
  billingCycle: varchar("billing_cycle", { length: 10 }).notNull().default("monthly"),
  startDate: timestamp("start_date"),
  memo: text("memo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  name: true,
  company: true,
  price: true,
  currency: true,
  billingCycle: true,
  startDate: true,
  memo: true,
  userId: true
});

// Exchange rate schema
export const exchangeRates = pgTable("exchange_rates", {
  id: serial("id").primaryKey(),
  base: varchar("base", { length: 3 }).notNull().default("JPY"),
  rates: text("rates").notNull(), // JSON string of rates
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertExchangeRateSchema = createInsertSchema(exchangeRates).pick({
  base: true,
  rates: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export type InsertExchangeRate = z.infer<typeof insertExchangeRateSchema>;
export type ExchangeRate = typeof exchangeRates.$inferSelect;
