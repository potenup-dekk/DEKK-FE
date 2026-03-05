import { USE_MOCK } from "@/shared/constants/config";

function resolveUrl(input: RequestInfo) {
  if (typeof input !== "string") return input;
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/api/")) return input;
  if (input.startsWith("/")) return `/api/proxy${input}`;
  return input;
}

export type ApiError = {
  code: string;
  message: string;
  errors?: string[];
};

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

export async function requestJson<T>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  const raw =
    typeof window !== "undefined"
      ? sessionStorage.getItem("mock_status")
      : null;

  if (USE_MOCK && typeof input === "string") {
    if (input === "/w/v1/users/me") {
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
    }
  }

  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const doFetch = () =>
    fetch(resolveUrl(input), {
      ...init,
      headers,
      credentials: "include",
    });

  const res = await doFetch();

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (res.ok) {
    return (isJson ? await res.json() : (null as T)) as T;
  }

  let payload: ApiError | null = null;
  if (isJson) {
    try {
      payload = (await res.json()) as ApiError;
    } catch {
      payload = null;
    }
  }

  throw new ApiRequestError(
    res.status,
    payload?.message ?? `Request failed: ${res.status}`,
    payload?.code,
    payload?.errors,
  );
}
