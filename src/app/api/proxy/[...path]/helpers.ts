import { NextRequest, NextResponse } from "next/server";
import { copyRequestHeaders, copyResponseHeaders } from "./headerHelpers";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  requestRefreshTokens,
  applyTokenCookies,
  clearTokenCookies,
  type TokenPair,
} from "./authHelpers";

const apiBaseUrl = () => {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
};

const readRequestBody = async (request: NextRequest) => {
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined;
  }

  return request.arrayBuffer();
};

const buildProxyRequest = async (
  request: NextRequest,
  path: string[],
  body?: ArrayBuffer,
) => {
  const baseUrl = apiBaseUrl();
  if (!baseUrl) {
    return {
      targetUrl: null,
      body,
      error: NextResponse.json(
        { message: "API_BASE_URL 이 설정되지 않았습니다." },
        { status: 500 },
      ),
    };
  }

  return {
    targetUrl: `${baseUrl}/${path.join("/")}${request.nextUrl.search}`,
    body,
    error: null,
  };
};

export {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  copyRequestHeaders,
  copyResponseHeaders,
  requestRefreshTokens,
  readRequestBody,
  buildProxyRequest,
  applyTokenCookies,
  clearTokenCookies,
};

export type { TokenPair };
