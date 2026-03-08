"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

const getCookieOptions = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
};

const setTokensAction = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, getCookieOptions());
  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, getCookieOptions());
};

const clearTokensAction = async () => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
};

export { clearTokensAction, setTokensAction };
