import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

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

interface TokenPayload {
  accessToken?: string;
  refreshToken?: string;
}

export async function POST(request: Request) {
  let payload: TokenPayload;

  try {
    payload = (await request.json()) as TokenPayload;
  } catch {
    return NextResponse.json(
      { message: "잘못된 요청 본문입니다." },
      { status: 400 },
    );
  }

  const accessToken = payload.accessToken?.trim();
  const refreshToken = payload.refreshToken?.trim();

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { message: "accessToken, refreshToken 이 필요합니다." },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, cookieOptions());
  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, cookieOptions());

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  clearAuthCookies(response);
  return response;
}
