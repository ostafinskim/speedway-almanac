import {
	pgTable,
	uuid,
	varchar,
	text,
	timestamp,
	boolean,
	integer,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	username: varchar('username', { length: 50 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	firstName: varchar('first_name', { length: 50 }),
	lastName: varchar('last_name', { length: 50 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const riders = pgTable('riders', {
	id: uuid('id').primaryKey().defaultRandom(),
	slug: varchar('slug', { length: 50 }).notNull(),
	bio: varchar('bio', { length: 255 }),
	dayOfBirth: varchar('day_of_birth', { length: 50 }).notNull(),
	placeOfBirth: varchar('place_of_birth', { length: 50 }).notNull(),
	firstName: varchar('first_name', { length: 50 }).notNull(),
	lastName: varchar('last_name', { length: 50 }).notNull(),
	nationality: varchar('nationality', { length: 255 }).notNull(),
	fimNumber: varchar('fim_number', { length: 5 }).notNull().unique(),
	fimRanking: varchar('fim_ranking', { length: 5 }).notNull().unique(),
	debut: varchar('debut', { length: 255 }),
	firstWin: varchar('first_win', { length: 255 }),
	imageUrl: varchar('image_url', { length: 255 }),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const seasons = pgTable('seasons', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('slug', { length: 255 }),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const rounds = pgTable('rounds', {
	id: uuid('id').primaryKey().defaultRandom(),
	
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/* User */ 
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

/* Rider */ 
export const insertRiderSchema = createInsertSchema(riders)
export const selectRiderSchema = createSelectSchema(riders)
export type Rider = typeof riders.$inferSelect
export type NewRider = typeof riders.$inferInsert

/* Season */ 
export const insertSeasonSchema = createInsertSchema(seasons)
export const selectSeasonSchema = createSelectSchema(seasons)
export type Season = typeof seasons.$inferSelect
export type NewSeason = typeof seasons.$inferInsert

/* Round */
