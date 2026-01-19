'use server';

import { axiosBackend } from "@/lib/axios"; // Verify this handles server-side usage correctly
import { loginSchema, registerSchema } from "@/lib/schemas";
import { z } from "zod";

export type ActionState = {
    success?: boolean;
    message?: string;
    errors?: {
        [key: string]: string[];
    };
    data?: any;
};

export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    
    const rawData = Object.fromEntries(formData);
    const validatedFields = loginSchema.safeParse(rawData);

    // Validation failed    
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields",
        };
    }

    const { email, password } = validatedFields.data;

    // Call backend API 
    try {
        const response = await axiosBackend.post('/auth/login', { email, password });

        return {
            success: true,
            data: response.data,
            message: response.data.message || "Login successful",
        };

    } catch (error: any) {
        console.error("Login failed:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || "Invalid credentials";
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export async function registerAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    
    const rawData = Object.fromEntries(formData);
    const validatedFields = registerSchema.safeParse(rawData);

    // Validation failed    
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields",
        };
    }

    const { firstName, lastName, email, password } = validatedFields.data;

    // Call backend API 
    try {
        const response = await axiosBackend.post('/auth/register', {
            firstName,
            lastName,
            email,
            password,
        });

        return {
            success: true,
            data: response.data,
            message: response.data.message || "Registration successful",
        };

    } catch (error: any) {
        console.error("Registration failed:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || "Registration failed";
        return {
            success: false,
            message: errorMessage,
        };
    }
}
