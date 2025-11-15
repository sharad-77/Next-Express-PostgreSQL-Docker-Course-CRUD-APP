"use client";

import { useAuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const context = useAuthContext();

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return {
    isAuthenticated: context.isAuthenticated,
    loading: context.loading,
    login: context.login,
    logout: context.logout,
  };
};
