"use client";

import { useCallback, useEffect, useState } from "react";

// development environment bypass for easier testing without authentication
const isLocalEnvironment = process.env.NODE_ENV === "development";

type UserStatus = "PENDING" | "ACTIVE";

interface GuardUser {
  id?: number;
  email?: string;
  status?: UserStatus;
  height?: number | null;
  weight?: number | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
}

interface GuardResponse {
  authenticated: boolean;
  user?: GuardUser | null;
}

interface UseAuthGuardResult {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: GuardUser | null;
  error: string | null;
  refetch: () => Promise<void>;
}

const fetchAuthGuard = async (): Promise<GuardResponse> => {
  const response = await fetch("/api/auth/guard", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("로그인 상태 확인에 실패했습니다.");
  }

  return (await response.json()) as GuardResponse;
};

const useAuthGuard = (): UseAuthGuardResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GuardUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (isLocalEnvironment) {
      setIsAuthenticated(true);
      setUser(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchAuthGuard();
      setIsAuthenticated(result.authenticated);
      setUser(result.authenticated ? (result.user ?? null) : null);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err instanceof Error
          ? err.message
          : "로그인 상태 확인 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    isLoading,
    isAuthenticated,
    user,
    error,
    refetch,
  };
};

export { useAuthGuard };
