import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/shared/config/env";

export const dynamic = "force-dynamic";
export const cache = "no-store";

const copySetCookieHeaders = (source: Headers, target: Headers) => {
  const responseHeaders = source as Headers & {
    getSetCookie?: () => string[];
  };

  for (const value of responseHeaders.getSetCookie?.() ?? []) {
    target.append("set-cookie", value);
  }
};

const copyResponseHeaders = (source: Headers) => {
  const target = new Headers();

  copySetCookieHeaders(source, target);

  source.forEach((value, key) => {
    const lowerKey = key.toLowerCase();

    if (
      lowerKey === "content-length" ||
      lowerKey === "set-cookie" ||
      lowerKey === "content-encoding"
    ) {
      return;
    }

    target.append(key, value);
  });

  return target;
};

const GET = async (request: NextRequest) => {
  const upstreamUrl = `${API_BASE}/w/v1/users/me${request.nextUrl.search}`;

  const headers = new Headers();
  const cookie = request.headers.get("cookie");

  if (cookie) {
    headers.set("cookie", cookie);
  }

  const upstream = await fetch(upstreamUrl, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const upstreamContentType = upstream.headers.get("content-type") ?? "";
  const isUnexpectedHtmlResponse =
    upstream.ok && upstreamContentType.includes("text/html");

  if (isUnexpectedHtmlResponse) {
    return NextResponse.json(
      {
        code: "AUTH_UNAUTHORIZED",
        message: "인증 정보가 유효하지 않습니다.",
        errors: ["Unexpected HTML response from auth upstream"],
      },
      {
        status: 401,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    status: upstream.status,
    headers: copyResponseHeaders(upstream.headers),
  });
};

export { GET };
