import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  buildAuthFailureResponse,
  buildAuthSuccessResponse,
  type TokenPair,
  type UserPayload,
} from "./responseHelpers";

const apiBaseUrl = () => {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
};

const requestMe = (baseUrl: string, accessToken?: string) => {
  const headers = new Headers();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(`${baseUrl}/w/v1/users/me`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
};

const requestRefresh = async (baseUrl: string, refreshToken: string) => {
  const response = await fetch(`${baseUrl}/w/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) return null;

  try {
    const payload = (await response.json()) as {
      data?: { accessToken?: string; refreshToken?: string };
    };
    const tokens = payload?.data;

    if (!tokens?.accessToken || !tokens?.refreshToken) {
      return null;
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  } catch {
    return null;
  }
};

export {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  apiBaseUrl,
  requestMe,
  requestRefresh,
  buildAuthFailureResponse,
  buildAuthSuccessResponse,
};

export type { TokenPair, UserPayload };
