'use server';

/*
 * Utility functions for authentication (JWT tokens, cookies and auth status)
 */

import { cookies } from 'next/headers';

// Cookie names as constants
const ACCESS_TOKEN_COOKIE = 'accessToken';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

/**
 * Set authentication cookies (access token and refresh token)
 */
export async function setAuthCookies(accessToken: string, refreshToken?: string) {
    const cookieStore = await cookies();

    // Set access token cookie
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });

    // Set refresh token cookie
    if (refreshToken) {
        cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }
}

/**
 * Get access token from cookies
 */
export async function getAccessToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}

/**
 * Set access token cookie
 */ 
export async function setAccessToken(accessToken: string) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });
}   

/**
 * Get refresh token from cookies
 */
export async function getRefreshToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
}

/**
 * Clear all authentication cookies (for logout)
 */
export async function clearAuthCookies() {
    const cookieStore = await cookies();

    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

/**
 * Check if user is authenticated (has access token)
 */
export async function isAuthenticated(): Promise<boolean> {
    const accessToken = await getAccessToken();
    return !!accessToken;
}
