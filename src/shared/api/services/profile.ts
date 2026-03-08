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
    case "USER_PROFILE_OK":
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

const getMyInfo = async () => {
  const response = await requestJson<ApiResponse<UserMe>>("/w/v1/users/me", {
    method: "GET",
  });

  return assertProfileResponse(response);
};

const updateMyProfile = async (payload: UpdateMyProfilePayload) => {
  const response = await requestJson<ApiResponse<null>>("/w/v1/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return assertProfileResponse(response);
};

const completeOnboarding = async (payload: OnboardingPayload) => {
  const response = await requestJson<ApiResponse<null>>(
    "/w/v1/users/onboarding",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return assertProfileResponse(response);
};

export {
  completeOnboarding,
  getMyInfo,
  updateMyProfile,
  type OnboardingPayload,
};
