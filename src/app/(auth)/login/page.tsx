"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requestJson } from "@/shared/api/client";
import { clearTokens } from "@/shared/auth/tokenStorage";
import {
  GoogleLoginButton,
  KakaoLoginButton,
} from "@/shared/components/Button";

type ApiResponse<T> = { code: string; message: string; data: T };
type Me = { status: "PENDING" | "ACTIVE" };

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await requestJson<ApiResponse<Me>>("/w/v1/users/me", {
          method: "GET",
        });

        if (res.data.status === "ACTIVE") {
          router.replace("/");
          return;
        }

        if (res.data.status === "PENDING") {
          await clearTokens();
        }
      } catch {}
    })();
  }, [router]);
  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen gap-2.5 max-w-md py-11">
      <div className="flex flex-1 items-center">
        <Image src="/logo_dekk.png" alt="DEKK" width={203} height={81} />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <span className="text-[#525252] text-[11px] text-center">
          소셜 로그인으로 빠르게 시작하기
        </span>
        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
    </div>
  );
}
