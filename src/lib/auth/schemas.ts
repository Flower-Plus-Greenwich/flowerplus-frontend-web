import { z } from "zod";

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    
    password: z.string()
        .min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters" }),

    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters" }),

    email: z.email({ message: "Invalid email address" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        // .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }) ,

    confirmPassword: z.string()
        .min(1, { message: "Confirm Password is required" }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
