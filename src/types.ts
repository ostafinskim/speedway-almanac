import { auth } from "@/lib/auth"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { club, rider } from "./db/schema"

export type AuthUserAndSession = {
	Variables: {
		user: typeof auth.$Infer.Session.user,
		session: typeof auth.$Infer.Session.session | null
	}
}

export type Rider = InferSelectModel<typeof rider>
export type NewRider = InferInsertModel<typeof rider>

export type Club = InferInsertModel<typeof club>
export type NewClub = InferInsertModel<typeof club>
