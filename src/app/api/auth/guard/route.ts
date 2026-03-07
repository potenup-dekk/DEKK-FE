import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

function apiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
}

async function requestMe(baseUrl: string, accessToken?: string) {
  const headers = new Headers();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(`${baseUrl}/w/v1/users/me`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
}

async function requestRefresh(baseUrl: string, refreshToken: string) {
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
}

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(
      { authenticated: true, user: null },
      { status: 200 },
    );
  }

  const baseUrl = apiBaseUrl();
  if (!baseUrl) {
    return NextResponse.json(
      { authenticated: false, message: "API_BASE_URL 이 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  let meResponse = await requestMe(baseUrl, accessToken);
  let refreshedTokens: { accessToken: string; refreshToken: string } | null =
    null;

  if (meResponse.status === 401 && refreshToken) {
    refreshedTokens = await requestRefresh(baseUrl, refreshToken);

    if (refreshedTokens) {
      meResponse = await requestMe(baseUrl, refreshedTokens.accessToken);
    }
  }

  if (!meResponse.ok) {
    const response = NextResponse.json(
      { authenticated: false },
      { status: 200 },
    );
    clearAuthCookies(response);
    return response;
  }

  const userPayload = (await meResponse.json()) as {
    data?: {
      id?: number;
      email?: string;
      status?: "PENDING" | "ACTIVE";
      height?: number | null;
      weight?: number | null;
      gender?: "MALE" | "FEMALE" | "OTHER" | null;
    };
  };

  const response = NextResponse.json(
    {
      authenticated: true,
      user: userPayload.data ?? null,
    },
    { status: 200 },
  );

  if (refreshedTokens) {
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
  }

  return response;
}
