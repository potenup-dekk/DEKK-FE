"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMyInfo } from "@/features/profile";

const OAuthRedirectClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const error = searchParams.get("error");
      if (error) {
        router.replace("/login");
        return;
      }

      try {
        const res = await getMyInfo();
        const status = res.data?.status;

        if (!status) {
          router.replace("/login");
          return;
        }

        router.replace(status === "PENDING" ? "/join" : "/");
      } catch {
        router.replace("/login");
      }
    })();
  }, [router, searchParams]);

  return <div>로그인 처리 중…</div>;
};

export default OAuthRedirectClient;
