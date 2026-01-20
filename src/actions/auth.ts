'use server';

import { axiosBackend } from "@/lib/axios";
import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/auth/schemas";
import { setAuthCookies, clearAuthCookies, setAccessToken } from '@/lib/auth/tokens'
import { ActionState } from "@/types";
import { redirect } from "next/navigation";


/** 
 * Server action for login
 * @param prevState - Previous state
 * @param formData - Form data
 * @returns Action state - { success, data, errors, message }
 */
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
        const response = await axiosBackend.post('/auth/login', { 
            email,
            password 
        });

        const { data = {}, message } = response?.data || {};
        const { accessToken, refreshToken } = data;

        // Set cookies for client
        await setAuthCookies(accessToken, refreshToken);

        // redirect("/login/success");
        
        return {
            success: true,
            data: data,
            message: message || "Login successful",
        };
        
    } catch (AxiosError: any) {
        const { error = {} } = AxiosError?.response?.data?.error || {}
        console.error("Login failed:", AxiosError.toString());
        const errorMessage = AxiosError?.message + ": " + error?.message || "Invalid credentials";
        return {
            success: false,
            message: errorMessage,
        };
    }
}


/** 
 * Server action for register
 * @param prevState - Previous state
 * @param formData - Form data
 * @returns Action state - { success, data, errors, message }
 */ 
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

    const { firstName, lastName, email, password, confirmPassword } = validatedFields.data;

    return {
        success: true,
        message: "Registration successful",
    };
    
    // Call backend API 
    // try {
    //     const response = await axiosBackend.post('/auth/register', {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         confirmPassword
    //     });

    //     /**
    //      * It's not necessary to set cookies here and send any data to the client 
    //      * Because the user is not logged in yet
    //      */
    //     console.log(response)

    //     const { message } = response?.data || {};

    //     return {
    //         success: true,
    //         message: message || "Registration successful",
    //     };

    // } catch (error: any) {
    //     console.log(error)
    //     console.error("Registration failed:", error.response?.data || error?.message);
    //     const errorMessage = error?.message + ": " + error?.response?.data?.error?.message;
    //     return {
    //         success: false,
    //         message: errorMessage,
    //     };
    // }
}


/** 
 * Server action for forgot password
 * @param prevState - Previous state
 * @param formData - Form data
 * @returns Action state - { success, data, errors, message }
 */ 
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
        const errorMessage = error.response?.data?.message ||
            error?.message + ": Failed to send reset instructions";
        return {
            success: false,
            message: errorMessage,
        };
    }
}


/** 
 * Server action for logout
 * @returns Action state - { success, message }
 */
export async function logoutAction(): Promise<ActionState> {
    try {
        // Clear cookies first
        await clearAuthCookies();

        // Call backend logout endpoint
        try {
            await axiosBackend.post('/auth/logout');
        } catch (error) {
            console.warn('Backend logout failed, but cookies cleared:', error);
        }

        return {
            success: true,
            message: "Logout successful",
        };
    } catch (error: any) {
        console.error("Logout failed:", error);
        return {
            success: false,
            message: "Logout failed",
        };
    }
}


/** 
 * Server action for refresh token
 * @returns Action state - { success, message }
 */
export async function refreshTokenAction(): Promise<ActionState> {
    try {
        const response = await axiosBackend.post('/auth/refresh');
        const { accessToken } = response.data.data;
        setAccessToken(accessToken);
        return {
            success: true,
            message: "Refresh token successful",
        };
    } catch (error: any) {
        console.error("Refresh token failed:", error);
        return {
            success: false,
            message: "Refresh token failed",
        };
    }
}   