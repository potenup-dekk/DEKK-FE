"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setTokens } from "@/shared/auth/tokenStorage";
import { requestJson } from "@/shared/api/client";

type ApiResponse<T> = { code: string; message: string; data: T };

type UserMe = {
  status: "PENDING" | "ACTIVE";
};

function OAuthRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const error = searchParams.get("error");
      if (error) {
        router.replace("/login");
        return;
      }

      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      if (!accessToken || !refreshToken) {
        router.replace("/login");
        return;
      }

      try {
        await setTokens(accessToken, refreshToken);

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

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중…</div>}>
      <OAuthRedirectHandler />
    </Suspense>
  );
}
