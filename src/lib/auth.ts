import { db } from "@/db/db";
import { accounts, sessions, users, verifications } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI } from "better-auth/plugins";
import { count, eq } from "drizzle-orm";
import { Resend } from "resend";
import { getVerificationEmailHtml } from "../emails/auth-templates";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: users,
			session: sessions,
			account: accounts,
			verification: verifications
		}
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			const RESEND_API = process.env.RESEND_API;
			const isDev = process.env.NODE_ENV !== 'production';

			const resend = new Resend(RESEND_API);
			const testEmail = 'delivered@resend.dev';

			const fromEmail = isDev
				? 'Speedway Almanac <onboarding@resend.dev>'
				: 'Speedway Almanac <noreply@speedway-almanac.dev>';

			await resend.emails.send({
				from: fromEmail,
				to: [isDev ? testEmail : user.email],
				subject: 'Verify your email',
				html: getVerificationEmailHtml(url, user.name)
			});
		}
	},
	plugins: [
		admin({
			defaultRole: "user",
			adminRoles: ["admin"],
		}),
		openAPI()
	],
	// Use database hooks to make first user an admin
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					try {
						// Count total users in the database
						const userCount = await db.select({ count: count() }).from(users);
						const totalUsers = Number(userCount[0]?.count || 0);

						// If this is the first user, make them admin
						if (totalUsers === 1) {
							await db
								.update(users)
								.set({ role: "admin" })
								.where(eq(users.id, user.id));

							console.log("✅ First user created as admin:", user.email);
						} else {
							console.log("👤 New user created:", user.email);
						}
					} catch (error) {
						console.error("❌ Error checking/setting admin role:", error);
					}
				}
			}
		}
	}
})