// import axios from 'axios';
// import { getRefreshToken, setAccessToken } from './auth/tokens';

// // 1. Frontend Interaction (Client -> Next.js API Routes)
// export const axiosFrontend = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     timeout: 10000,
// });


// // Request interceptors 
// axiosFrontend.interceptors.request.use((config) => {
//     // if (accessToken) {
//     //     config.headers.Authorization = `Bearer ${accessToken}`;
//     // }
//     return config;
// });

// // Response interceptors    
// axiosFrontend.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Redirect to login
//             // window.location.href = '/login';
//             console.error("Unauthorized");
//         }
//         return Promise.reject(error);
//     }
// );


// // 2. Backward Interaction (Next.js Server -> Java Backend)
// export const axiosBackend = axios.create({
//     baseURL: process.env.BACKEND_URL, // e.g. http://localhost:8080
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true,
//     timeout: 10000,
// });

// // Helper to add server-side secrets or tokens to backend requests
// axiosBackend.interceptors.request.use((config) => {
//     // If you have a server-to-server secret or need to forward a user token:
//     // config.headers['X-API-Key'] = process.env.API_SECRET;
//     return config;
// });

// axiosBackend.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response?.status === 401) {

//             // Get new access token 
//             const refreshToken = await getRefreshToken();
//             if (refreshToken) {
//                 const response = await axios.post("/auth/refresh", 
//                     { refreshToken }, 
//                     { withCredentials: true }
//                 );
//                 const { accessToken } = response?.data?.data;
//                 setAccessToken(accessToken);
//             }
            
//         }
//         return Promise.reject(error);
//     }
// );

