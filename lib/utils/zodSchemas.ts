import { z } from 'zod';

export const userSchema = z.object({
   email: z.string().email(),
   username: z.string().min(5, "Please enter a minimum of 5 letters"),
   password: z.string().min(5, "Please enter a minimum of 5 letters"),
})


export const userExistsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Please enter a minimum of 5 letters")
})