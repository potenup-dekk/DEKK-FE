import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Gender } from "@/entities/user";

interface ProfileUser {
  email?: string | null;
  nickname?: string | null;
  height?: number | null;
  weight?: number | null;
  gender?: Gender | null;
}

interface UseProfileClientSyncParams {
  router: ReturnType<typeof useRouter>;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: ProfileUser | null;
  setFormFromUser: (nextUser: ProfileUser) => void;
}

const useProfileClientSync = ({
  router,
  isLoading,
  isAuthenticated,
  user,
  setFormFromUser,
}: UseProfileClientSyncParams) => {
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    setFormFromUser(user);
  }, [setFormFromUser, user]);
};

export default useProfileClientSync;
