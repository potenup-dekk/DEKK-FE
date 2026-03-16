"use client";

import { useCallback, useEffect, useState } from "react";
import { getMyInfo } from "@/features/profile";
import { ApiRequestError } from "@/shared/api/fetcher/client";

// development environment bypass for easier testing without authentication
// const isLocalEnvironment = process.env.NODE_ENV === "development";
const isLocalEnvironment = false;

type UserStatus = "PENDING" | "ACTIVE";

interface GuardUser {
  id?: number;
  email?: string;
  nickname?: string | null;
  status?: UserStatus;
  height?: number | null;
  weight?: number | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
}

interface UseAuthGuardResult {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: GuardUser | null;
  error: string | null;
  refetch: () => Promise<void>;
}

const applyLocalAuthState = (
  setIsAuthenticated: (value: boolean) => void,
  setUser: (value: GuardUser | null) => void,
  setError: (value: string | null) => void,
  setIsLoading: (value: boolean) => void,
) => {
  setIsAuthenticated(true);
  setUser(null);
  setError(null);
  setIsLoading(false);
};

const useAuthGuard = (): UseAuthGuardResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GuardUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    const result = await getMyInfo();
    const nextUser = result.data ?? null;

    setIsAuthenticated(Boolean(nextUser));
    setUser(nextUser);
  }, []);

  const refetch = useCallback(async () => {
    if (isLocalEnvironment) {
      applyLocalAuthState(setIsAuthenticated, setUser, setError, setIsLoading);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await loadUser();
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) {
        setError("세션이 만료되었습니다. 다시 로그인해 주세요.");
        return;
      }

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
  }, [loadUser]);

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
