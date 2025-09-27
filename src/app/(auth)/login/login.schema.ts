import * as z from "zod";
export const loginSchema = z.object({
    email: z.email('Email is required'),
    password: z.string('Password is required').nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),
})

export type loginType = z.infer<typeof loginSchema>;