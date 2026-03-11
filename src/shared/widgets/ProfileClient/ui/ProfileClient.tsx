"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/shared/api/services";
import { useAuthGuard } from "@/shared/hooks";
import useProfileForm from "../model/useProfileForm";
import useProfileClientSync from "../model/useProfileClientSync";
import { profileClientStyle } from "../style";
import ProfileFormView from "./ProfileFormView";

const ProfileClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user, error, refetch } = useAuthGuard();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const profileForm = useProfileForm({
    refetch,
    onUnauthorized: () => router.replace("/login"),
  });
  const { loading } = profileClientStyle();

  useProfileClientSync({
    router,
    isLoading,
    isAuthenticated,
    user,
    setFormFromUser: profileForm.setFormFromUser,
  });

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    if (user?.status === "PENDING") {
      router.replace("/join");
    }
  }, [isAuthenticated, isLoading, router, user?.status]);

  if (isLoading) {
    return <div className={loading()}>로그인 상태 확인 중…</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user?.status === "PENDING") {
    return null;
  }

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setSettingsError(null);
    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/login");
    } catch (logoutError) {
      setSettingsError(
        logoutError instanceof Error
          ? logoutError.message
          : "로그아웃 처리 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleWithdraw = () => {
    setSettingsError("회원탈퇴 기능은 준비 중입니다.");
  };

  return (
    <ProfileFormView
      form={profileForm.form}
      formErrors={profileForm.formErrors}
      submitError={profileForm.submitError}
      authError={error}
      settingsError={settingsError}
      isSubmitting={profileForm.isSubmitting}
      isReady={profileForm.isReady}
      isLoggingOut={isLoggingOut}
      email={user?.email}
      onLogout={handleLogout}
      onWithdraw={handleWithdraw}
      handleChange={profileForm.handleChange}
      handleSubmit={profileForm.handleSubmit}
    />
  );
};

export default ProfileClient;
