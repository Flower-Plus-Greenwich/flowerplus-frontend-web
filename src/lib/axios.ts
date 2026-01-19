import axios from 'axios';

// 1. Frontend Interaction (Client -> Next.js API Routes)
// This is used in React components to call your own Next.js API
export const axiosFrontend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. /api or http://localhost:3000/api
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// In-memory access token storage
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

// Helper to add auth token (if needed) to frontend requests
axiosFrontend.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosFrontend.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login
            // window.location.href = '/login';
            console.error("Unauthorized");
        }
        return Promise.reject(error);
    }
);


// 2. Backward Interaction (Next.js Server -> Java Backend)
// This is used inside API Routes or Server Actions
export const axiosBackend = axios.create({
    baseURL: process.env.BACKEND_URL, // e.g. http://localhost:8080
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Helper to add server-side secrets or tokens to backend requests
axiosBackend.interceptors.request.use((config) => {
    // If you have a server-to-server secret or need to forward a user token:
    // config.headers['X-API-Key'] = process.env.API_SECRET;
    return config;
});

axiosBackend.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login
            // window.location.href = '/login';
            console.error("Unauthorized");
        }
        return Promise.reject(error);
    }
);

