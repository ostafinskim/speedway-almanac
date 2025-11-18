import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { ensureAdmin } from "../middleware/ensureAdmin";
import type { AuthUserAndSession } from "../types";

export const clubs = new Hono<AuthUserAndSession>()

clubs.use(authMiddleware)

// GET /api/v1/club - get all clubs
clubs.get('/', (c) => {
	// TODO: fetch all clubs
	try {
		return c.json({ message: 'All club list' });
	} catch (error) {
		return c.json({ error: 'Failed to fetch clubs' }, 500)
	}
});

// GET /api/v1/club/:id - get all clubs
clubs.get('/:id', (c) => {
	// TODO: fetch single club
	const { id } = c.req.param
	try {
		return c.json({ message: 'All club list' });
	} catch (error) {
		return c.json({ error: 'Failed to fetch clubs' }, 500)
	}
});


// POST /api/v1/club - create club
clubs.post('/', ensureAdmin, async (c) => {
	const body = await c.req.json();
	// TODO: create new club - admin only
	try {
		return c.json({ message: 'New club created', data: body }, 201);
	} catch (error) {
		return c.json({ error: 'Failed to create new club' }, 500)
	}
});