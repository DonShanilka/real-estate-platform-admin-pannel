import axios from 'axios';
import { error } from 'next/dist/build/output/log';
import { config } from 'next/dist/build/templates/pages';

const api_base_url = process.env.api_url || "http://127.0.0.1:8000";

const axiosInstatnce = axios.create({
    baseURL: api_base_url,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// request interceptor
axiosInstatnce.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// response interceptor
axiosInstatnce.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstatnce;