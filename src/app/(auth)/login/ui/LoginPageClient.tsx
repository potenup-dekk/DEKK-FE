"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleLoginButton,
  KakaoLoginButton,
} from "@/shared/components/Button";
import { useAuthGuard } from "@/shared/hooks";
import prefetchAndReplace from "@/shared/hooks/prefetchAndReplace";

const LoginPageClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useAuthGuard();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user?.status) {
      return;
    }

    if (user.status === "ACTIVE") {
      prefetchAndReplace(router, "/");
      return;
    }

    if (user.status === "PENDING") {
      prefetchAndReplace(router, "/join");
    }
  }, [isAuthenticated, isLoading, router, user?.status]);

  return (
    <div className="flex flex-col justify-center h-full w-80 items-center m-auto gap-2.5 p-3">
      <div className="flex flex-col gap-3 w-full">
        <span className="text-primary text-[11px] text-center">
          나만의 핏을 탐색하고 수집해보세요!
        </span>

        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default LoginPageClient;
