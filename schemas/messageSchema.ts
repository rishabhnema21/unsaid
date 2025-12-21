import { z } from 'zod'

export const messageSchema = z.object({
    content: z
        .string()
        .min(4, {message: "Content should be atleast 10 characters"})
        .max(300, {message: "Content must be no longer then 300 characters"})
})