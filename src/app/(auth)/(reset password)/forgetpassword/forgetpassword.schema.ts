import * as z from "zod";
export const ForgetPasswordSchema = z.object({
    email: z.email('Email is required'),
})

export type forgetPasswordType = z.infer<typeof ForgetPasswordSchema>;