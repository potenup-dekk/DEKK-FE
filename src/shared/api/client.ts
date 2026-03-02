import { getAccessToken, clearAccessToken } from "@/shared/auth/tokenStorage";
import { USE_MOCK } from "@/shared/constants/config";

export type ApiError = {
  code: string;
  message: string;
  errors?: string[];
};

export type ApiSuccess<T> = {
  code: string;
  message: string;
  data: T;
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

/**
 * 공통 JSON 요청 함수
 * - accessToken 있으면 Authorization 자동 주입
 * - refreshToken은 HttpOnly 쿠키로 내려오면, fetch credentials: 'include'로 자동 포함
 */
export async function requestJson<T>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  // -------------------------
  // MOCK 처리 (3000만으로 테스트)
  // -------------------------
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
          status: (sessionStorage.getItem("mock_status") as any) ?? "PENDING",
          role: "USER",
        },
      } as T;
    }

    if (input === "/w/v1/users/onboarding" && init.method === "POST") {
      const body = init.body ? JSON.parse(String(init.body)) : {};

      // 닉네임 중복 mock: real과 동일한 에러 타입으로 던지기
      if (body.nickname === "중복닉네임") {
        throw new ApiRequestError(
          409,
          "이미 사용 중인 닉네임입니다.",
          "EU40901",
          ["nickname"],
        );
      }

      sessionStorage.setItem("mock_status", "ACTIVE");
      return {
        code: "SU20001",
        message: "온보딩이 성공적으로 완료되었습니다.",
        data: null,
      } as T;
    }
  }

  // 기본 Content-Type
  if (!headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");

  // Authorization 자동 주입
  const accessToken = getAccessToken();
  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(input, { ...init, headers, credentials: "include" });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (res.ok) return (isJson ? await res.json() : (null as T)) as T;

  let payload: ApiError | null = null;
  if (isJson) {
    try {
      payload = (await res.json()) as ApiError;
    } catch {
      payload = null;
    }
  }

  if (res.status === 401) {
    // TODO: refresh 도입 후 재발급/재시도
    clearAccessToken();
  }

  throw new ApiRequestError(
    res.status,
    payload?.message ?? `Request failed: ${res.status}`,
    payload?.code,
    payload?.errors,
  );
}
