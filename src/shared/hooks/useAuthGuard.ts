"use client";

import { useCallback, useEffect, useState } from "react";

type UserStatus = "PENDING" | "ACTIVE";

type GuardUser = {
  id?: number;
  email?: string;
  status?: UserStatus;
};

type GuardResponse = {
  authenticated: boolean;
  user?: GuardUser | null;
};

type UseAuthGuardResult = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: GuardUser | null;
  error: string | null;
  refetch: () => Promise<void>;
};

async function fetchAuthGuard(): Promise<GuardResponse> {
  const response = await fetch("/api/auth/guard", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("로그인 상태 확인에 실패했습니다.");
  }

  return (await response.json()) as GuardResponse;
}

export function useAuthGuard(): UseAuthGuardResult {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GuardUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
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
}
