import { z } from 'zod';



export const userSchema = z.object({
   email: z.string().email(),
   username: z.string().min(5, "Please enter a minimum of 5 letters"),
   password: z.string().min(5, "Please enter a minimum of 5 letters"),
})


export const portfolioSchema = z.object({
    "Tolerance": z.number(),
    "Nigerian Stocks": z.number(),
    "Foreign Stocks": z.number(),
    "Tech Stocks": z.number(),
    "Emerging Stocks": z.number(),
    "Nigerian Bonds": z.number(),
    "Foreign Bonds": z.number(),
    "Commodities": z.number(),
    "Real Estate": z.number(),
    "T-Bills": z.number(),
    "Alternative": z.number(),
})


export const userExistsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Please enter a minimum of 5 letters")
})


