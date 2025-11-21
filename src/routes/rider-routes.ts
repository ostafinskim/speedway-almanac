import { Hono } from "hono";
import { getRiderById } from "../db/queries";
import { authMiddleware } from "../middleware/auth";
import { ensureAdmin } from "../middleware/ensureAdmin";
import type { AuthUserAndSession } from "../types";

export const riders = new Hono<AuthUserAndSession>()

riders.use(authMiddleware)

// GET /api/v1/rider - get all riders
riders.get('/', (c) => {
	// TODO: fetch all clubs
	try {
		return c.json({ message: 'All club list' });
	} catch (error) {
		return c.json({ error: 'Failed to fetch clubs' }, 500)
	}
});

riders.get('/:id', async (c) => {
	// TODO: fetch single rider
	const { id } = c.req.param()
	try {
		const rider = await getRiderById(id)
		return c.json({ rider });
	} catch (error) {
		return c.json({ error: 'Failed to fetch clubs' }, 500)
	}
});

// POST /api/v1/rider - create rider
riders.post('/', ensureAdmin, async (c) => {
	const body = await c.req.json();
	// TODO: create new club - admin only
	try {
		return c.json({ message: 'New club created', data: body }, 201);
	} catch (error) {
		return c.json({ error: 'Failed to create new club' }, 500)
	}
});