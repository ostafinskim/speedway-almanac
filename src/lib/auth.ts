import { db } from "@/db/db";
import { getVerificationEmailHtml } from "@/emails/auth-templates";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI } from "better-auth/plugins";
import { Resend } from "resend";

type BetterAuthContext = {
	path: string;
	context: {
		newSession?: {
			user: {
				id: string;
				email: string;
				name: string;
				role?: string;
			};
		};
		returned?: {
			user: {
				id: string;
				email: string;
				name: string;
				role?: string;
			};
		};
	};
};

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
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
	// add role to response
	hooks: {
		after: async (ctx) => {
			const typedCtx = ctx as unknown as BetterAuthContext;
			if (typedCtx.path === "/sign-in/email" || typedCtx.path === "/sign-up/email") {
				const newSession = typedCtx.context.newSession;
				if (newSession?.user?.role && typedCtx.context.returned?.user) {
					typedCtx.context.returned.user.role = newSession.user.role;
				}
			}
			return ctx;
		}
	},
	plugins: [
		admin({
			defaultRole: "user",
			adminRoles: ["admin"],
			adminUserIds: [process.env.ADMIN_USER_ID!]
		}),
		openAPI()
	]
}
)