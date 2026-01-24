import { getAccessToken, getRefreshToken, setAuthCookies, clearAuthCookies } from "../auth/tokens";

type FetcherOptions = RequestInit & {
    timeout?: number;
    skipAuth?: boolean; // Option to add authorization header 
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

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    // Prepare headers
    const reqHeaders = new Headers(headers);
    if (!reqHeaders.has('Content-Type') && !(rest.body instanceof FormData)) {
        reqHeaders.set('Content-Type', 'application/json');
    }
    if (!reqHeaders.has('Accept')) {
        reqHeaders.set('Accept', '*/*');
    }

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

    // Helper to perform the actual fetch
    const performFetch = async (targetUrl: string, targetConfig: RequestInit) => {
        try {
            // Ensure URL is absolute
            const fullUrl = targetUrl.startsWith('http') ? targetUrl : `${BASE_URL}${targetUrl}`;
            const response = await fetch(fullUrl, targetConfig);
            return response;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
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
        throw error;
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
        cache: 'force-cache',     // or 'default'
        ...options
    });
}

// Generic fetcher
export const fetcher = baseFetcher;