import type { Gender } from "@/entities/user";

interface RouterLike {
  replace: (href: string) => void;
  prefetch?: (href: string) => void;
}

interface JoinFormValue {
  nickname: string;
  height: string;
  weight: string;
  gender: "" | Gender;
}

interface JoinFormErrors {
  nickname?: string;
  height?: string;
  weight?: string;
  gender?: string;
}

interface JoinPayload {
  nickname: string;
  height: number;
  weight: number;
  gender: Gender;
}

export type { JoinFormErrors, JoinFormValue, JoinPayload, RouterLike };
