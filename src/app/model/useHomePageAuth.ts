import { useEffect, useState } from "react";
import { clearTokensAction } from "@/shared/api/actions";

interface Me {
  email: string;
  status: "PENDING" | "ACTIVE";
}

interface UseHomePageAuthResult {
  me: Me | null;
}

interface AuthGuardResponse {
  authenticated: boolean;
  user?: Me | null;
}

const useHomePageAuth = (): UseHomePageAuthResult => {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const response = await fetch("/api/auth/guard", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          setMe(null);
          return;
        }

        const { authenticated, user } =
          (await response.json()) as AuthGuardResponse;

        if (!authenticated || !user) {
          setMe(null);
          return;
        }

        if (user.status === "PENDING") {
          await clearTokensAction();
          setMe(null);
          return;
        }

        setMe(user);
      } catch {
        setMe(null);
      }
    };

    void syncUser();
  }, []);

  return { me };
};

export default useHomePageAuth;
