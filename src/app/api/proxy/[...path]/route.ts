import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "dekk_access_token";
const REFRESH_TOKEN_COOKIE = "dekk_refresh_token";

const HOP_BY_HOP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "cookie",
]);

const HOP_BY_HOP_RESPONSE_HEADERS = new Set([
  "connection",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "set-cookie",
]);

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

function copyRequestHeaders(headers: Headers) {
  const copied = new Headers();

  headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (HOP_BY_HOP_REQUEST_HEADERS.has(lowerKey)) return;
    copied.set(key, value);
  });

  return copied;
}

function copyResponseHeaders(headers: Headers) {
  const copied = new Headers();

  headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (HOP_BY_HOP_RESPONSE_HEADERS.has(lowerKey)) return;
    copied.set(key, value);
  });

  return copied;
}

async function requestRefreshTokens(refreshToken: string) {
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
}

async function proxyRequest(
  request: NextRequest,
  path: string[],
  requestBody?: ArrayBuffer,
) {
  const baseUrl = apiBaseUrl();

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API_BASE_URL 이 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const queryString = request.nextUrl.search;
  const targetUrl = `${baseUrl}/${path.join("/")}${queryString}`;
  const cookieStore = await cookies();
  const storedAccessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const storedRefreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  const doFetch = async (accessToken?: string) => {
    const headers = copyRequestHeaders(request.headers);

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return fetch(targetUrl, {
      method: request.method,
      headers,
      body: requestBody,
      cache: "no-store",
    });
  };

  let upstream = await doFetch(storedAccessToken);
  let refreshedTokens: { accessToken: string; refreshToken: string } | null =
    null;

  if (upstream.status === 401 && storedRefreshToken) {
    refreshedTokens = await requestRefreshTokens(storedRefreshToken);

    if (refreshedTokens) {
      upstream = await doFetch(refreshedTokens.accessToken);
    }
  }

  const responseBody = await upstream.arrayBuffer();
  const response = new NextResponse(responseBody, {
    status: upstream.status,
    headers: copyResponseHeaders(upstream.headers),
  });

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

  if (upstream.status === 401) {
    response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
      ...cookieOptions(),
      maxAge: 0,
    });
    response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
      ...cookieOptions(),
      maxAge: 0,
    });
  }

  return response;
}

async function handle(request: NextRequest, path: string[]) {
  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer();

  return proxyRequest(request, path, requestBody);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handle(request, path);
}

export async function OPTIONS(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return handle(request, path);
}
