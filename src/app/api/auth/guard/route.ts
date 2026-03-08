import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  apiBaseUrl,
  requestMe,
  requestRefresh,
  buildAuthFailureResponse,
  buildAuthSuccessResponse,
  type TokenPair,
  type UserPayload,
} from "./helpers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const baseUrl = apiBaseUrl();
  if (!baseUrl) {
    return NextResponse.json(
      { authenticated: false, message: "API_BASE_URL 이 설정되지 않았습니다." },
      { status: 200 },
    );
  }

  let meResponse = await requestMe(baseUrl, accessToken);
  let refreshedTokens: TokenPair | null = null;

  if (meResponse.status === 401 && refreshToken) {
    refreshedTokens = await requestRefresh(baseUrl, refreshToken);

    if (refreshedTokens) {
      meResponse = await requestMe(baseUrl, refreshedTokens.accessToken);
    }
  }

  if (!meResponse.ok) {
    return buildAuthFailureResponse();
  }

  const userPayload = (await meResponse.json()) as UserPayload;
  return buildAuthSuccessResponse(userPayload, refreshedTokens);
}
