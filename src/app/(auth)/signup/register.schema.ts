import * as z from "zod";

// {
//     "name": "Ahmed Abd Al-Muti",
//     "email":"ahmedmuttii4012@gmail.com",
//     "password":"Ahmed@123",
//     "rePassword":"Ahmed@123",
//     "phone":"01010700701"
// }
export const RegisterSchema = z.object({
    name: z.string('First name is required').nonempty('First name is required').min(3, "min length is 3").max(10, "max length is 10"),
    phone: z.string('Phone is required').nonempty('Phone is required').regex(/^01[0125][0-9]{8}$/, 'Number must be egyptian'),
    email: z.email('Email is required'),
    password: z.string('Password is required').nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),
    rePassword: z.string('Confirm Password is required').nonempty('Repassword is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),
})
    .refine(({ password, rePassword }) => password === rePassword, { path: ['rePassword'], error: 'Password inmatch' });

export type registerType = z.infer<typeof RegisterSchema>;