"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setTokens } from "@/shared/auth/tokenStorage";
import { requestJson } from "@/shared/api/client";
import { USE_MOCK } from "@/shared/constants/config";

type ApiResponse<T> = { code: string; message: string; data: T };

type UserMe = {
  status: "PENDING" | "ACTIVE";
};

export default function OAuthRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      router.replace("/login");
      return;
    }

    if (USE_MOCK) {
      setTokens("mock_access_token", "mock_refresh_token");
      router.replace("/join");
      return;
    }

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      router.replace("/login");
      return;
    }

    setTokens(accessToken, refreshToken);

    (async () => {
      try {
        const res = await requestJson<ApiResponse<UserMe>>("/w/v1/users/me", {
          method: "GET",
        });

        router.replace(res.data.status === "PENDING" ? "/join" : "/");
      } catch {
        router.replace("/login");
      }
    })();
  }, [router, searchParams]);

  return <div>로그인 처리 중…</div>;
}
