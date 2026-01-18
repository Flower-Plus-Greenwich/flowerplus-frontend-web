import { axiosFrontend } from '@/lib/axios';
import { AxiosResponse } from 'axios';

// Example generic fetcher using the Frontend Instance
export const fetcher = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await axiosFrontend.get(url);
    return response.data;
};

// Example service object interacting with Next.js API Routes
export const authService = {
    login: async (credentials: any) => {
        // This calls /api/auth/login (Next.js) which then proxies to Java
        return axiosFrontend.post('/auth/login', credentials);
    },
};
