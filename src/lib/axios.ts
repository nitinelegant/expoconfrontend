import { AUTH_TOKEN, USER } from "@/constants/auth";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth data and redirect to login
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER);
      window.location.href = "/";
    }
    if (error.response?.status === 403) {
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  }
);
