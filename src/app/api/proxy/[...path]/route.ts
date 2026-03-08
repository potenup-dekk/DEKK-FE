import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  applyTokenCookies,
  buildProxyRequest,
  clearTokenCookies,
  copyRequestHeaders,
  copyResponseHeaders,
  readRequestBody,
  requestRefreshTokens,
  type TokenPair,
} from "./helpers";

const fetchUpstream = (
  request: NextRequest,
  targetUrl: string,
  body: ArrayBuffer | undefined,
  accessToken?: string,
) => {
  const headers = copyRequestHeaders(request.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });
};

const requestWithRefresh = async (
  request: NextRequest,
  targetUrl: string,
  body: ArrayBuffer | undefined,
  storedAccessToken?: string,
  storedRefreshToken?: string,
) => {
  let upstream = await fetchUpstream(
    request,
    targetUrl,
    body,
    storedAccessToken,
  );
  let refreshedTokens: TokenPair | null = null;

  if (upstream.status === 401 && storedRefreshToken) {
    refreshedTokens = await requestRefreshTokens(storedRefreshToken);
    if (refreshedTokens) {
      upstream = await fetchUpstream(
        request,
        targetUrl,
        body,
        refreshedTokens.accessToken,
      );
    }
  }

  return { upstream, refreshedTokens };
};

const proxyRequest = async (
  request: NextRequest,
  path: string[],
  requestBody?: ArrayBuffer,
) => {
  const prepared = await buildProxyRequest(request, path, requestBody);
  if (prepared.error || !prepared.targetUrl) {
    return prepared.error as NextResponse;
  }

  const cookieStore = await cookies();
  const storedAccessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const storedRefreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const { upstream, refreshedTokens } = await requestWithRefresh(
    request,
    prepared.targetUrl,
    prepared.body,
    storedAccessToken,
    storedRefreshToken,
  );

  const responseBody = await upstream.arrayBuffer();
  const response = new NextResponse(responseBody, {
    status: upstream.status,
    headers: copyResponseHeaders(upstream.headers),
  });

  if (refreshedTokens) {
    applyTokenCookies(response, refreshedTokens);
  }

  if (upstream.status === 401) {
    clearTokenCookies(response);
  }

  return response;
};

const createMethodHandler = () => {
  return async (
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> },
  ) => {
    const { path } = await context.params;
    const requestBody = await readRequestBody(request);
    return proxyRequest(request, path, requestBody);
  };
};
const methodHandler = createMethodHandler();
export const GET = methodHandler,
  POST = methodHandler,
  PUT = methodHandler,
  PATCH = methodHandler,
  DELETE = methodHandler,
  OPTIONS = methodHandler;
