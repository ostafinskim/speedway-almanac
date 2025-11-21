import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { NewClub, NewRider } from "../types"
import { clubs, riders } from "./schema"

// Riders - start 

export const getAllRiders = async () => {
	const result = await db.query.riders.findMany();
	return result
}

export const getRiderById = async (riderId: string) => {
	const result = await db.select().from(riders).where(eq(riders.id, riderId))
	return result[0]
}

export const insertRider = async (newRider: NewRider) => {
	const [result] = await db.insert(riders).values(newRider).returning()
	return result
}

export const updateRider = async (riderId: string, updatedData: Partial<NewRider>) => {
	const [result] = await db.update(riders).set(updatedData).where(eq(riders.id, riderId)).returning()
	return result
}

export const deleteRider = async (riderId: string) => {
	return await db.delete(riders).where(eq(riders.id, riderId))
}

// Riders - end

// Clubs - start

export const getAllClubs = async () => {
	const result = await db.query.clubs.findMany();
	return result
}

export const getClubById = async (clubId: string) => {
	const result = await db.select().from(clubs).where(eq(clubs.id, clubId))
	return result[0]
}

export const insertClub = async (newClub: NewClub) => {
	const [result] = await db.insert(clubs).values(newClub).returning()
	return result;
}

export const updateClub = async (clubId: string, updatedData: Partial<NewClub>) => {
	const [result] = await db.update(clubs).set(updatedData).where(eq(clubs.id, clubId)).returning()
	return result
}

export const deleteClub = async (clubId: string) => {
	return await db.delete(clubs).where(eq(clubs.id, clubId))
}

// Clubs - end