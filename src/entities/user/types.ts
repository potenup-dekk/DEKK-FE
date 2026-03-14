export type Gender = "MALE" | "FEMALE" | "OTHER";

export type UserStatus = "PENDING" | "ACTIVE";

export interface UserMe {
  id: number;
  email: string;
  nickname: string | null;
  height: number | null;
  weight: number | null;
  gender: Gender | null;
  status: UserStatus;
  role?: string;
}

export interface UpdateMyProfilePayload {
  nickname: string;
  height: number;
  weight: number;
  gender: Gender;
}
