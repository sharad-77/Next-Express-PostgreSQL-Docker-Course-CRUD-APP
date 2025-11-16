"use client";

import axios from "axios";

const BACKENDURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: `${BACKENDURL}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      let message = "Something went wrong";

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        message = "Unauthorized. Please login again.";
      }
      else if (error.response) {
        message = error.response.data?.message || message;
      }

      alert(message);
    }

    return Promise.reject(new Error("Request failed"));
  }
);

export default api;
