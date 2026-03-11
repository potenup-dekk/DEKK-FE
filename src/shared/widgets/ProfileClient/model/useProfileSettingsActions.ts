import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/shared/api/services";

const toLogoutErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "로그아웃 처리 중 오류가 발생했습니다.";
};

const useProfileSettingsActions = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }

    setSettingsError(null);
    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      setSettingsError(toLogoutErrorMessage(error));
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, router]);

  const handleWithdraw = useCallback(() => {
    setSettingsError("회원탈퇴 기능은 준비 중입니다.");
  }, []);

  return { handleLogout, handleWithdraw, isLoggingOut, settingsError };
};

export default useProfileSettingsActions;
