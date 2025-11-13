import { auth } from "@/lib/auth"

export type AuthUserAndSession = {
	Variables: {
		user: typeof auth.$Infer.Session.user,
		session: typeof auth.$Infer.Session.session | null
	}
}