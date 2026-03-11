import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/shared/config/env";

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

const POST = async (
  request: NextRequest,
  context: { params: Promise<{ cardId: string }> },
) => {
  const { cardId } = await context.params;
  const upstreamUrl = `${API_BASE}/w/v1/cards/${cardId}/swipe`;

  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  const contentType = request.headers.get("content-type");
  const body = await request.arrayBuffer();

  if (cookie) {
    headers.set("cookie", cookie);
  }

  if (contentType) {
    headers.set("content-type", contentType);
  }

  const upstream = await fetch(upstreamUrl, {
    method: "POST",
    headers,
    body,
    cache: "no-store",
  });

  const upstreamBody = await upstream.arrayBuffer();

  return new NextResponse(upstreamBody, {
    status: upstream.status,
    headers: copyResponseHeaders(upstream.headers),
  });
};

export { POST };
