"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearTokensAction } from "@/shared/api/actions";
import {
  GoogleLoginButton,
  KakaoLoginButton,
} from "@/shared/components/Button";
import { useAuthGuard } from "@/shared/hooks";

const LoginPageClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useAuthGuard();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user?.status) {
      return;
    }

    if (user.status === "ACTIVE") {
      router.replace("/");
      return;
    }

    if (user.status === "PENDING") {
      void clearTokensAction();
    }
  }, [isAuthenticated, isLoading, router, user?.status]);

  return (
    <div className="flex flex-col justify-center h-full items-center m-auto gap-2.5 p-3">
      <div className="flex flex-col gap-3 w-full">
        <span className="text-primary text-[11px] text-center">
          소셜 로그인으로 빠르게 시작하기
        </span>

        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default LoginPageClient;
