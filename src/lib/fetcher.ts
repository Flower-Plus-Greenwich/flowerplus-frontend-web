
// import { headers as nextHeaders } from 'next/headers'
import { getAccessToken, getRefreshToken, setAuthCookies, clearAuthCookies } from "./tokens";

type FetcherOptions = RequestInit & {
    timeout?: number;
    skipAuth?: boolean; // Option to add authorization header 
    revalidate?: number;
};

const BASE_URL = process.env.BACKEND_URL || '';

// Core fetcher function
async function baseFetcher(url: string, options: FetcherOptions = {}) {
    const {
        timeout = 20000,
        headers = {},
        skipAuth = false,
        ...rest
    } = options;

    // console.log("options", options)

    // Set timeout for request
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    // Get cookies
    // const headersList = await nextHeaders()
    // const cookieHeader = headersList.get('cookie') || ''

    // Prepare headers
    const reqHeaders = new Headers(headers);
    if (!reqHeaders.has('Content-Type') && !(rest.body instanceof FormData)) {
        reqHeaders.set('Content-Type', 'application/json');
    }
    if (!reqHeaders.has('Accept')) {
        reqHeaders.set('Accept', '*/*');
    }
    // if (!reqHeaders.has('Cookie')) {
    //     reqHeaders.set('Cookie', cookieHeader);
    // }

    // Auto-inject Access Token
    if (!skipAuth) {
        const accessToken = await getAccessToken();
        if (accessToken) {
            reqHeaders.set('Authorization', `Bearer ${accessToken}`);
        }
    }

    const config: RequestInit = {
        ...rest,
        headers: reqHeaders,
        signal: controller.signal,
    };

    // console.log("config", config)

    // Helper function to perform the actual fetch operation
    const performFetch = async (targetUrl: string, targetConfig: RequestInit) => {
        try {
            // Ensure URL is absolute
            const fullUrl = targetUrl.startsWith('http') ? targetUrl : `${BASE_URL}${targetUrl}`;
            const response = await fetch(fullUrl, targetConfig);
            return response;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.error('Request timeout');
            }
            console.error(error);
            throw error;
        } finally {
            clearTimeout(id);
        }
    };

    try {
        let response = await performFetch(url, config);

        // Handle 401 Unauthorized - Retry Logic
        if (response.status === 401 && !skipAuth) {
            console.warn('Received 401, attempting to refresh token...');

            const refreshToken = await getRefreshToken();

            // No refresh token found
            if (!refreshToken) {
                console.error('No refresh token found');
                await clearAuthCookies();
                return response;
            }

            // Has refresh token
            if (refreshToken) {
                // Attempt to refresh
                try {
                    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken }),
                        cache: 'no-store',
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        const newAccessToken = data.data?.accessToken || data.accessToken;
                        const newRefreshToken = data.data?.refreshToken || data.refreshToken; // If backend rotates it

                        if (newAccessToken) {
                            // save new tokens
                            await setAuthCookies(newAccessToken, newRefreshToken || refreshToken);

                            // Retry original request with new token
                            reqHeaders.set('Authorization', `Bearer ${newAccessToken}`);
                            const retryConfig = { ...config, headers: reqHeaders };

                            // Re-create controller for retry? Or just use new fetch
                            // Simple retry
                            response = await performFetch(url, retryConfig);
                        }
                    } else {
                        console.error('Refresh token failed');
                        await clearAuthCookies();
                    }
                } catch (refreshErr) {
                    console.error('Error during token refresh:', refreshErr);
                }
            }
        }

        return response;

    } catch (error) {
        console.error("Error during fetch:", error);
    }
}

// Wrapper for Server Actions (POST, no-cache defaults)
export async function actionFetcher(url: string, options: FetcherOptions = {}) {
    return baseFetcher(url, {
        method: 'POST',
        cache: 'no-store',
        ...options
    });
}

// Wrapper for Data Fetching (GET, cache defaults)
export async function dataFetcher(url: string, options: FetcherOptions = {}) {
    return baseFetcher(url, {
        method: 'GET',
        cache: 'force-cache',
        ...options
    });
}

// Generic fetcher
export const fetcher = baseFetcher;