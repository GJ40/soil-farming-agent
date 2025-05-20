// create axios instance and export
import axios from "axios";
import { getToken, removeToken, removeUser, setToken } from "./Tokens";

// To Use env variables create .env file in project dorectory and name vars like 'VITE_your_var'
export const Instance = axios.create({
    baseURL: "https://soil-farming-agent-j0uz.onrender.com",
    withCredentials: true
});


// Attach access token to every request
Instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to refresh token on 403
Instance.interceptors.response.use(
    (response) => response, // if success, just return it
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh token endpoint (must send cookie automatically withCredentials)
                const res = await Instance.post("/users/refresh");

                const newAccessToken = res.data.token;
                setToken(newAccessToken);

                // Update Authorization header and retry original request
                originalRequest.headers["Authorization"] = newAccessToken;
                // return Instance(originalRequest);

                const responses = await Instance(originalRequest);

                window.location.reload();

                return responses;

            } catch (refreshError) {
                // Refresh failed — clear tokens, redirect or logout user
                removeToken();
                removeUser();
                await Instance.post('/users/logout');

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);