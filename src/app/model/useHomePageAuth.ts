import { useEffect, useState } from "react";
import { getMyInfo } from "@/features/profile";
import { logout } from "@/shared/api/services";

interface Me {
  email: string;
  status: "PENDING" | "ACTIVE";
}

interface UseHomePageAuthResult {
  me: Me | null;
}

const useHomePageAuth = (): UseHomePageAuthResult => {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const response = await getMyInfo();
        const user = response.data;

        if (!user) {
          setMe(null);
          return;
        }

        if (user.status === "PENDING") {
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
