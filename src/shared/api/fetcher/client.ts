import { API_BASE } from "@/shared/config/env";

const resolveUrl = (input: RequestInfo) => {
  if (typeof input !== "string") return input;
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/api/")) return input;
  if (input.startsWith("/")) {
    return `${API_BASE}${input}`;
  }
  return input;
};

export interface ApiError {
  code: string;
  message: string;
  errors?: string[];
}

export class ApiRequestError extends Error {
  status: number;
  code?: string;
  errors?: string[];

  constructor(
    status: number,
    message: string,
    code?: string,
    errors?: string[],
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

const ensureContentType = (init: RequestInit, headers: Headers) => {
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
};

const parseApiError = async (response: Response): Promise<ApiError | null> => {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!isJson) return null;

  try {
    return (await response.json()) as ApiError;
  } catch {
    return null;
  }
};

export async function requestJson<T>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  ensureContentType(init, headers);

  const res = await fetch(resolveUrl(input), {
    ...init,
    headers,
    credentials: "include",
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (res.ok) {
    if (isJson) {
      return (await res.json()) as T;
    }

    if (res.status === 204 || res.status === 205) {
      return null as T;
    }

    throw new ApiRequestError(
      res.status,
      `Unexpected non-JSON response: ${res.status}`,
      "NON_JSON_RESPONSE",
    );
  }

  const payload = await parseApiError(res);

  throw new ApiRequestError(
    res.status,
    payload?.message ?? `Request failed: ${res.status}`,
    payload?.code,
    payload?.errors,
  );
}
