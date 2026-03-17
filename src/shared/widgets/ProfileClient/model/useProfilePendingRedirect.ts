import { useEffect } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import prefetchAndReplace from "@/shared/hooks/prefetchAndReplace";

const useProfilePendingRedirect = (
  router: AppRouterInstance,
  isLoading: boolean,
  isAuthenticated: boolean,
  userStatus?: "PENDING" | "ACTIVE",
) => {
  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    if (userStatus === "PENDING") {
      prefetchAndReplace(router, "/join");
    }
  }, [isAuthenticated, isLoading, router, userStatus]);
};

export default useProfilePendingRedirect;
