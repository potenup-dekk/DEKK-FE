"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMyInfo } from "@/features/profile";
import prefetchAndReplace from "@/shared/hooks/prefetchAndReplace";

const OAuthRedirectClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const error = searchParams.get("error");
      if (error) {
        prefetchAndReplace(router, "/login");
        return;
      }

      try {
        const res = await getMyInfo();
        const status = res.data?.status;

        if (!status) {
          prefetchAndReplace(router, "/login");
          return;
        }

        prefetchAndReplace(router, status === "PENDING" ? "/join" : "/");
      } catch {
        prefetchAndReplace(router, "/login");
      }
    })();
  }, [router, searchParams]);

  return <div>로그인 처리 중…</div>;
};

export default OAuthRedirectClient;
