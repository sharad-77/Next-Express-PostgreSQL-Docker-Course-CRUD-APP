"use client";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: unknown;
}

interface RequestMeta {
  startTime: number;
  requestId: string;
}

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    metadata?: RequestMeta;
  }
}

interface ErrorInfo {
  title: string;
  description: string;
  type:
    | "network"
    | "validation"
    | "auth"
    | "permission"
    | "not_found"
    | "conflict"
    | "rate_limit"
    | "server"
    | "unknown";
}


const getErrorMessage = (error: AxiosError<ApiErrorResponse>): ErrorInfo => {
  const { response, message } = error;

  if (!response) {
    return {
      title: "Network Error",
      description: "Unable to connect to the server.",
      type: "network",
    };
  }

  const status = response.status;
  const errorMessage =
    response.data?.message ||
    response.data?.error ||
    message ||
    "Unknown error";

  switch (status) {
    case 400:
    case 422:
      return {
        title: "Validation Error",
        description: errorMessage,
        type: "validation",
      };

    case 401:
      return {
        title: "Unauthorized",
        description: "Your session has expired. Please login again.",
        type: "auth",
      };

    case 403:
      return {
        title: "Access Denied",
        description: "You don't have permission to perform this action.",
        type: "permission",
      };

    case 404:
      return {
        title: "Not Found",
        description: "Requested resource not found.",
        type: "not_found",
      };

    case 409:
      return {
        title: "Conflict",
        description: errorMessage,
        type: "conflict",
      };

    case 429:
      return {
        title: "Too Many Requests",
        description: "Please wait and try again.",
        type: "rate_limit",
      };

    case 500:
      return {
        title: "Server Error",
        description: "Something went wrong on our server.",
        type: "server",
      };

    default:
      return {
        title: "Request Failed",
        description: errorMessage,
        type: "unknown",
      };
  }
};

const getBaseURL = (): string => `${BACKEND_URL}/api/v1`;

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    config.metadata = {
      startTime: Date.now(),
      requestId: Math.random().toString(36).substring(2),
    };

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const errorInfo = getErrorMessage(error);

    if (errorInfo.type === "auth") {
      localStorage.removeItem("token");
      window.location.assign("/login");
      return Promise.reject(errorInfo);
    }

    if (process.env.NODE_ENV === "development") {
      const meta = error.config?.metadata;
      console.error("❌ API Error Debug:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        url: error.config?.url,
        method: error.config?.method,
        duration: meta ? Date.now() - meta.startTime : undefined,
        requestId: meta?.requestId,
      });
    }

    return Promise.reject(errorInfo);
  }
);

export default api;
