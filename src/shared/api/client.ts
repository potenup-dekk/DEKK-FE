import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@/shared/auth/tokenStorage";
import { USE_MOCK } from "@/shared/constants/config";

export type ApiError = {
  code: string;
  message: string;
  errors?: string[];
};

export class ApiRequestError extends Error {
  status: number;
  code?: string;
  errors?: string[];

  constructor(
    status: number,
    message: string,
    code?: string,
    errors?: string[],
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

type RefreshResponse = {
  code: string;
  message: string;
  data: { accessToken: string; refreshToken: string };
};

type UserStatus = "PENDING" | "ACTIVE";

let refreshPromise: Promise<{
  accessToken: string;
  refreshToken: string;
} | null> | null = null;

async function refreshTokens(): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch("/w/v1/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        credentials: "include",
      });

      if (!res.ok) return null;

      const json = (await res.json()) as RefreshResponse;
      const tokens = json?.data;

      if (!tokens?.accessToken || !tokens?.refreshToken) return null;

      setTokens(tokens.accessToken, tokens.refreshToken);
      return tokens;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function requestJson<T>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  const raw =
    typeof window !== "undefined"
      ? sessionStorage.getItem("mock_status")
      : null;

  if (USE_MOCK && typeof input === "string") {
    if (input === "/w/v1/users/me") {
      return {
        code: "SU20002",
        message: "내 정보 조회에 성공했습니다.",
        data: {
          id: 1,
          email: "test@example.com",
          nickname: null,
          height: null,
          weight: null,
          gender: null,
          status: (raw === "ACTIVE" ? "ACTIVE" : "PENDING") as UserStatus,
          role: "USER",
        },
      } as T;
    }
  }

  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const accessToken = getAccessToken();
  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const doFetch = () =>
    fetch(input, {
      ...init,
      headers,
      credentials: "include",
    });

  let res = await doFetch();

  if (res.status === 401) {
    const tokens = await refreshTokens();
    if (!tokens) {
      clearTokens();
      throw new ApiRequestError(
        401,
        "인증이 만료되었습니다. 다시 로그인 해주세요.",
      );
    }

    headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    res = await doFetch();
  }

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (res.ok) {
    return (isJson ? await res.json() : (null as T)) as T;
  }

  let payload: ApiError | null = null;
  if (isJson) {
    try {
      payload = (await res.json()) as ApiError;
    } catch {
      payload = null;
    }
  }

  if (res.status === 401) {
    clearTokens();
  }

  throw new ApiRequestError(
    res.status,
    payload?.message ?? `Request failed: ${res.status}`,
    payload?.code,
    payload?.errors,
  );
}
