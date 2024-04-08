import { z } from "zod";
const signUpSchema = z.object({
    fullName: z
        .string({ required_error: "Full name is required" })
        .trim()
        .min(3, { message: "Full name must be at least 3 characters long" })
        .max(255, { message: "Full name must be at most 255 characters long" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters long" })
        .max(255, { message: "Email must be at most 255 characters long" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(255, { message: "Password must be at most 255 characters long" }),
});
const signInSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters long" })
        .max(255, { message: "Email must be at most 255 characters long" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(255, { message: "Password must be at most 255 characters long" }),
});
export { signUpSchema, signInSchema };
