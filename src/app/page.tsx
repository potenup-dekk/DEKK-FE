"use client";

import { useEffect, useState } from "react";
import { requestJson } from "@/shared/api/client";
import { clearTokens } from "@/shared/auth/tokenStorage";
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

        // 온보딩 미완료면 join으로 라우팅
        if (res.data.status === "PENDING") {
          clearTokens();
          setMe(null);
          return;
        }

        setMe(res.data);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  const logout = async () => {
    try {
      // 현재는 더미지만, 규격 맞추기로 호출
      await requestJson<ApiResponse<null>>("/w/v1/auth/logout", {
        method: "POST",
      });
    } catch {
      // 실패해도 FE 토큰 삭제는 진행(서버가 stateless라 의미 없음)
    } finally {
      clearTokens();
      setMe(null);
    }
  };

  return (
    <div>
      <div>{me ? `로그인: ${me.email} (${me.status})` : "비로그인"}</div>

      {me ? (
        <ActionButton label="로그아웃" onClick={logout} />
      ) : (
        <ActionButton
          label="로그인 하러가기"
          onClick={() => (window.location.href = "/login")}
        />
      )}
    </div>
  );
}
