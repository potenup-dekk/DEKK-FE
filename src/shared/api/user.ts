import { requestJson } from "@/shared/api/client";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type UserStatus = "PENDING" | "ACTIVE";

export type UserMe = {
  id: number;
  email: string;
  nickname: string | null;
  height: number | null;
  weight: number | null;
  gender: Gender | null;
  status: UserStatus;
  role?: string;
};

export type UpdateMyProfilePayload = {
  height: number;
  weight: number;
  gender: Gender;
};

export async function getMyInfo() {
  return requestJson<ApiResponse<UserMe>>("/w/v1/users/me", {
    method: "GET",
  });
}

export async function updateMyProfile(payload: UpdateMyProfilePayload) {
  return requestJson<ApiResponse<null>>("/w/v1/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
