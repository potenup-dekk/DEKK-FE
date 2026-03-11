import { useEffect } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
      router.replace("/join");
    }
  }, [isAuthenticated, isLoading, router, userStatus]);
};

export default useProfilePendingRedirect;
