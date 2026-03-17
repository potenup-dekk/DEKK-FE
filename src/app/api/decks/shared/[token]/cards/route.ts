import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/shared/config/env";

interface RouteParams {
  token: string;
}

interface RouteContext {
  params: Promise<RouteParams>;
}

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

    if (lowerKey === "content-length" || lowerKey === "set-cookie") {
      return;
    }

    target.append(key, value);
  });

  return target;
};

const GET = async (request: NextRequest, context: RouteContext) => {
  const { token } = await context.params;
  const upstreamUrl = `${API_BASE}/w/v1/decks/shared/${token}/cards${request.nextUrl.search}`;

  const upstream = await fetch(upstreamUrl, {
    method: "GET",
    cache: "no-store",
  });

  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    status: upstream.status,
    headers: copyResponseHeaders(upstream.headers),
  });
};

export { GET };
