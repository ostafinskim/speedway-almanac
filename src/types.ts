import { auth } from "@/lib/auth"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { clubs, riders } from "./db/schema"

export type AuthUserAndSession = {
	Variables: {
		user: typeof auth.$Infer.Session.user,
		session: typeof auth.$Infer.Session.session | null
	}
}

export type Rider = InferSelectModel<typeof riders>
export type NewRider = InferInsertModel<typeof riders>

export type Club = InferInsertModel<typeof clubs>
export type NewClub = InferInsertModel<typeof clubs>
