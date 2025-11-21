import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";
import { AuthUserAndSession } from "../types";

export const ensureAdmin = createMiddleware<AuthUserAndSession>(async (c, next) => {

	const session = await auth.api.getSession({ headers: c.req.raw.headers })

	if (!session) {
		return c.json({ error: 'Unauthorized' }, 401)
	}

	if (session.user.role !== 'admin') {
		return c.json({ error: 'Forbidden' }, 403);
	}

	return next();

});