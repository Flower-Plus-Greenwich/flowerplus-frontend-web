'use server';

import { actionFetcher } from "@/lib/fetcher";
import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/schemas";
import { setAuthCookies, clearAuthCookies, getRefreshToken, setAccessToken } from '@/lib/tokens';
import { ActionState } from "@/types";

/** 
 * Server action for login
 */
export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const rawData = Object.fromEntries(formData);
    const validatedFields = loginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please don't leave any field empty or invalid format",
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const response = await actionFetcher('/auth/login', {
            body: JSON.stringify({ email, password }),
            skipAuth: true, // Skip authorization for login
        });

        // console.log(response)

        if (response?.headers.get('Content-Type') !== 'application/json') {
            return {
                success: false,
                message: `${response?.status} ${response?.statusText}: Invalid response from server, expected JSON response`,
            };
        }

        const jsonData = await response?.json();
        // console.log(jsonData)

        if (!response?.ok) {
            return {
                success: false,
                message: `${response?.status} ${response?.statusText}: ${jsonData?.message ||
                    jsonData?.error?.message || "Login failed"}`,
            };
        }

        const { accessToken, refreshToken } = jsonData.data || {};

        if (!accessToken || !refreshToken) {
            return {
                success: false,
                message: "Invalid response from server, missing access token or refresh token",
            };
        }

        // Set cookies for client
        await setAuthCookies(accessToken, refreshToken);

        return {
            success: true,
            data: jsonData.data,
            message: jsonData.message || "Login successful",
        };

    } catch (fetchError: any) {
        console.error("Login failed:", fetchError);
        return {
            success: false,
            message: fetchError.message || "An unexpected error occurred",
        };
    }
}


/** 
 * Server action for register
 */
export async function registerAction(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const rawData = Object.fromEntries(formData);
    const validatedFields = registerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Make sure to fill all fields correctly",
        };
    }

    const { firstName, lastName, email, password, confirmPassword } = validatedFields.data;

    try {
        const response = await actionFetcher('/auth/register', {
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }),
            skipAuth: true,
        });

        // Check if response is JSON
        if (response?.headers.get('Content-Type') !== 'application/json') {
            return {
                success: false,
                message: `${response?.status} ${response?.statusText}: Invalid response from server, expected JSON response`,
            };
        }

        const jsonData = await response?.json();

        if (!response?.ok) {
            return {
                success: false,
                message: jsonData?.message || jsonData?.error?.message || "Registration failed",
            };
        }

        return {
            success: true,
            message: jsonData.message || "Registration successful",
        };

    } catch (error: any) {
        console.error("Registration failed:", error);
        return {
            success: false,
            message: error.message || "Registration failed",
        };
    }
}


/** 
 * Server action for forgot password
 */
export async function forgotPasswordAction(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const rawData = Object.fromEntries(formData);
    const validatedFields = forgotPasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please enter a valid email address",
        };
    }

    const { email } = validatedFields.data;

    try {
        const response = await actionFetcher('/auth/forgot-password', {
            body: JSON.stringify({ email }),
            skipAuth: true,
        });

        const data = await response?.json();

        if (!response?.ok) {
            return {
                success: false,
                message: data.message || "Failed to send reset instructions",
            };
        }

        return {
            success: true,
            data: { ...data, email },
            message: data.message || "Password reset instructions sent to your email",
        };

    } catch (error: any) {
        console.error("Forgot password failed:", error);
        return {
            success: false,
            message: error.message || "Failed to send reset instructions",
        };
    }
}


/** 
 * Server action for logout
 */
export async function logoutAction(): Promise<ActionState> {
    try {
        // Clear cookies
        await clearAuthCookies();

        // Attempt to notify backend
        try {
            await actionFetcher('/auth/logout', {});
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
 * Server action for refresh token (Explicit call)
 */
export async function refreshTokenAction(): Promise<ActionState> {
    try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
            return {
                success: false,
                message: "No refresh token available",
            };
        }

        const response = await actionFetcher('/auth/refresh', {
            body: JSON.stringify({ refreshToken }),
            skipAuth: true, // Skip authorization header because we are sending refresh token
        });

        const data = await response?.json();

        if (!response?.ok) {
            return {
                success: false,
                message: "Refresh token failed",
            };
        }

        const { accessToken } = data.data || data;
        if (accessToken) {
            await setAccessToken(accessToken);
        }

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