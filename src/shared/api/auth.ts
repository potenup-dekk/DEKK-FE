import { requestJson } from "./client";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type JoinProfilePayload = {
  nickname: string;
  height: number;
  weight: number;
  gender: Gender;
};

export type JoinProfileResult = {
  id: number;
  email: string;
  name: string;
};

export async function JoinProfile(payload: JoinProfilePayload) {
  return requestJson<JoinProfileResult>("/api/users/profile", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
