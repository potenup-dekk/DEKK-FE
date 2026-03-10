import { NextRequest, NextResponse } from "next/server";
import {
  buildProxyRequest,
  copyRequestHeaders,
  copyResponseHeaders,
  readRequestBody,
} from "./helpers";

const fetchUpstream = (
  request: NextRequest,
  targetUrl: string,
  body: ArrayBuffer | undefined,
) => {
  const headers = copyRequestHeaders(request.headers);

  return fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });
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

  const upstream = await fetchUpstream(
    request,
    prepared.targetUrl,
    prepared.body,
  );

  const responseBody = await upstream.arrayBuffer();
  const response = new NextResponse(responseBody, {
    status: upstream.status,
    headers: copyResponseHeaders(upstream.headers),
  });

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
