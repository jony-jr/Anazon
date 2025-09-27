import { z } from "zod"
export const pymentFormSchema = z.object({
    phone: z.string().nonempty('Phone is required').regex(/^01[0125][0-9]{8}$/, 'Number must be egyptian'),
    city: z.string().nonempty('City is required').min(3, "minimum is 3").max(12, '12'),
    details: z.string().nonempty('details is required').max(160,"maximum is 160").min(4,"minimum is 3"),
    type: z.enum(["cash", "visa"])
})
export type paymentType = z.infer<typeof pymentFormSchema>
