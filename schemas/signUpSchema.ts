import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(10, "Username must be at max 10 character")
    .regex(/^[a-zA-Z0-9_]+$/ , "Username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email Address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"})
})