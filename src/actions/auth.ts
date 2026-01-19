'use server';

import { axiosBackend } from "@/lib/axios"; // Verify this handles server-side usage correctly
import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/schemas";

import { ActionState } from "@/types";

export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const rawData = Object.fromEntries(formData);
    const validatedFields = loginSchema.safeParse(rawData);

    // Validation failed    
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please don't leave any field empty or invalid format",
        };
    }

    const { email, password } = validatedFields.data;

    // Call backend API 
    try {
        const response = await axiosBackend.post('/auth/login', { email, password });

        return {
            success: true,
            data: response?.data,
            message: response?.data?.message || "Login successful",
        };

    } catch (error: any) {
        console.error("Login failed:", error.response?.data || error?.message);
        const errorMessage = error.response?.data?.message || error?.message + ": Invalid credentials";
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
            message: "Make sure to fill all fields correctly",
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
        console.error("Registration failed:", error.response?.data || error?.message);
        const errorMessage = error.response?.data?.message || error?.message + ": Registration failed";
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export async function forgotPasswordAction(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const rawData = Object.fromEntries(formData);
    const validatedFields = forgotPasswordSchema.safeParse(rawData);

    // Validation failed    
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please enter a valid email address",
        };
    }

    const { email } = validatedFields.data;

    // Call backend API 
    try {
        const response = await axiosBackend.post('/auth/forgot-password', { email });

        return {
            success: true,
            data: { ...response.data, email }, // Include email in response data
            message: response.data.message || "Password reset instructions sent to your email",
        };

    } catch (error: any) {
        console.error("Forgot password failed:", error.response?.data || error?.message);
        const errorMessage = error.response?.data?.message || error?.message + ": Failed to send reset instructions";
        return {
            success: false,
            message: errorMessage,
        };
    }
}

