import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

const apiBaseUrl = () => {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
};

const cookieOptions = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
};

const requestRefreshTokens = async (refreshToken: string) => {
  const baseUrl = apiBaseUrl();
  if (!baseUrl) return null;

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

const applyTokenCookies = (
  response: NextResponse,
  refreshedTokens: TokenPair,
) => {
  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    refreshedTokens.accessToken,
    cookieOptions(),
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    refreshedTokens.refreshToken,
    cookieOptions(),
  );
};

const clearTokenCookies = (response: NextResponse) => {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
};

export {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  requestRefreshTokens,
  applyTokenCookies,
  clearTokenCookies,
};

export type { TokenPair };
