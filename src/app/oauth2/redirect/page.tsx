"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAccessToken } from "@/shared/auth/tokenStorage";
import { requestJson } from "@/shared/api/client";
import { USE_MOCK } from "@/shared/constants/config";

type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

type UserMe = {
  id: number;
  email: string;
  nickname: string | null;
  height: number | null;
  weight: number | null;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  status: "PENDING" | "ACTIVE";
  role: string;
};

export default function OAuthRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    // BE가 실패 리다이렉트로 error 쿼리 붙일 수도 있으니 가드
    const error = searchParams.get("error");

    if (error) {
      // TODO: 에러 UI/토스트/로그인 페이지 안내 등
      console.error("OAuth error:", error);
      router.replace("/login");
      return;
    }

    if (!accessToken) {
      if (USE_MOCK) {
        setAccessToken("mock_access_token");
        router.replace("/join");
        return;
      }
      router.replace("/login");
      return;
    }

    // accessToken 저장
    // - refreshToken은 HttpOnly 쿠키로 내려오면 FE가 저장하지 않아야 함
    setAccessToken(accessToken);

    // 서버에서 내 상태 확인 후 라우팅
    (async () => {
      try {
        const res = await requestJson<ApiResponse<UserMe>>("/w/v1/users/me", {
          method: "GET",
        });

        const status = res.data.status;
        if (status === "PENDING") {
          router.replace("/join");
        } else {
          router.replace("/");
        }
      } catch (e) {
        // TODO: 401이면 accessToken 만료/유효하지 않음 → refresh 붙기 전까진 재로그인 유도
        console.error(e);
        router.replace("/login");
      }
    })();
  }, [router, searchParams]);

  return <div>로그인 처리 중…</div>;
}
