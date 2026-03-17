import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { ApiResponse } from "@/shared/types/api";
import type { UserMe, UpdateMyProfilePayload } from "@/entities/user";

interface OnboardingPayload {
  nickname: string;
  height: number;
  weight: number;
  gender: "MALE" | "FEMALE" | "OTHER";
}

const isSuccessCode = (code: string) => {
  return code.startsWith("S") || code.endsWith("OK");
};

const assertProfileResponse = <T>(response: ApiResponse<T>) => {
  switch (response.code) {
    case "SU20001":
    case "SU20002": {
      return response;
    }
    default: {
      if (isSuccessCode(response.code)) {
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

const getMyInfo = async (cookieHeader?: string) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;
  const endpoint = cookieHeader ? "/w/v1/users/me" : "/api/users/me";

  const response = await requestJson<ApiResponse<UserMe>>(endpoint, {
    method: "GET",
    headers,
  });

  return assertProfileResponse(response);
};

const updateMyProfile = async (
  payload: UpdateMyProfilePayload,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null> | null>(
    "/w/v1/users/me",
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    },
  );

  if (!response) {
    return {
      code: "HTTP_NO_CONTENT",
      message: "프로필 수정이 완료되었습니다.",
      data: null,
    } satisfies ApiResponse<null>;
  }

  return assertProfileResponse(response);
};

const completeOnboarding = async (
  payload: OnboardingPayload,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null> | null>(
    "/w/v1/users/onboarding",
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
  );

  if (!response) {
    return {
      code: "HTTP_NO_CONTENT",
      message: "온보딩이 완료되었습니다.",
      data: null,
    } satisfies ApiResponse<null>;
  }

  return assertProfileResponse(response);
};

export {
  completeOnboarding,
  getMyInfo,
  updateMyProfile,
  type OnboardingPayload,
};
