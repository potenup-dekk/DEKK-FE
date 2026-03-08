import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

type UserPayload = {
  data?: {
    id?: number;
    email?: string;
    status?: "PENDING" | "ACTIVE";
    height?: number | null;
    weight?: number | null;
    gender?: "MALE" | "FEMALE" | "OTHER" | null;
  };
};

const cookieOptions = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
};

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
};

const buildAuthFailureResponse = () => {
  const response = NextResponse.json({ authenticated: false }, { status: 200 });
  clearAuthCookies(response);
  return response;
};

const buildAuthSuccessResponse = (
  userPayload: UserPayload,
  refreshedTokens: TokenPair | null,
) => {
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
};

export {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  buildAuthFailureResponse,
  buildAuthSuccessResponse,
};

export type { TokenPair, UserPayload };
