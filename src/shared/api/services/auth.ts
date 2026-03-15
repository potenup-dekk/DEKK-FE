import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { ApiResponse } from "@/shared/types/api";

const assertAuthResponse = <T>(response: ApiResponse<T>) => {
  switch (response.code) {
    case "SU20000":
    case "SU20010":
    case "AUTH_LOGOUT_OK": {
      return response;
    }
    default: {
      if (response.code.startsWith("S") || response.code.endsWith("OK")) {
        return response;
      }

      throw new ApiRequestError(
        400,
        response.message,
        response.code,
        response.errors,
      );
    }
  }
};

const logout = async () => {
  const response = await requestJson<ApiResponse<null> | null>(
    "/w/v1/auth/logout",
    {
      method: "POST",
    },
  );

  console.log(response);

  if (!response) {
    return {
      code: "HTTP_NO_CONTENT",
      message: "로그아웃이 완료되었습니다.",
      data: null,
    } satisfies ApiResponse<null>;
  }

  return assertAuthResponse(response);
};

export { logout };
