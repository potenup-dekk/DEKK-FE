import { USE_MOCK } from "@/shared/constants/config";
import { API_BASE } from "@/shared/config/env";

const resolveUrl = (input: RequestInfo) => {
  const isServer = typeof window === "undefined";

  if (typeof input !== "string") return input;
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/api/")) return input;
  if (input.startsWith("/")) {
    return isServer ? `${API_BASE}${input}` : `/api/proxy${input}`;
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

type UserStatus = "PENDING" | "ACTIVE";

const getMockUserMe = <T>(input: RequestInfo): T | null => {
  const raw =
    typeof window !== "undefined"
      ? sessionStorage.getItem("mock_status")
      : null;

  if (!USE_MOCK || typeof input !== "string" || input !== "/w/v1/users/me") {
    return null;
  }

  return {
    code: "SU20002",
    message: "내 정보 조회에 성공했습니다.",
    data: {
      id: 1,
      email: "test@example.com",
      nickname: null,
      height: null,
      weight: null,
      gender: null,
      status: (raw === "ACTIVE" ? "ACTIVE" : "PENDING") as UserStatus,
      role: "USER",
    },
  } as T;
};

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
  const mockResult = getMockUserMe<T>(input);
  if (mockResult) return mockResult;

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
    return (isJson ? await res.json() : (null as T)) as T;
  }

  const payload = await parseApiError(res);

  throw new ApiRequestError(
    res.status,
    payload?.message ?? `Request failed: ${res.status}`,
    payload?.code,
    payload?.errors,
  );
}
