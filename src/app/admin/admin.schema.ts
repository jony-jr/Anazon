import { z,infer } from "zod"

export const adminSchema = z.object({
    user: z.string().nonempty('user is required'),
    password: z.string().nonempty('password is required'),
})

export type adminType = z.infer<typeof adminSchema>