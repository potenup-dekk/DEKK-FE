"use client";

import { useEffect, useState } from "react";
import { requestJson } from "@/shared/api/client";
import { clearAccessToken } from "@/shared/auth/tokenStorage";
import { ActionButton } from "@/shared/components/Button";

type ApiResponse<T> = { code: string; message: string; data: T };
type Me = { email: string; status: "PENDING" | "ACTIVE" };

export default function HomePage() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await requestJson<ApiResponse<Me>>("/w/v1/users/me", {
          method: "GET",
        });
        setMe(res.data);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  const logout = () => {
    // refreshToken 쿠키 로그아웃까지 하려면 BE logout API가 필요(추후)
    clearAccessToken();
    window.location.href = "/login";
  };

  return (
    <div>
      <div>{me ? `로그인: ${me.email} (${me.status})` : "비로그인"}</div>
      {me && <ActionButton label="로그아웃" onClick={logout} />}
    </div>
  );
}
