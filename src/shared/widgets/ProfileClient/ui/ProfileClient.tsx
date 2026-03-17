"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/shared/hooks";
import prefetchAndReplace from "@/shared/hooks/prefetchAndReplace";
import useProfileForm from "../model/useProfileForm";
import useProfileClientSync from "../model/useProfileClientSync";
import useProfilePendingRedirect from "../model/useProfilePendingRedirect";
import useProfileSettingsActions from "../model/useProfileSettingsActions";
import { profileClientStyle } from "../style";
import ProfileFormView from "./ProfileFormView";

interface ProfileClientContentProps {
  profileForm: ReturnType<typeof useProfileForm>;
  authError: string | null;
  settingsError: string | null;
  isLoggingOut: boolean;
  email?: string;
  onLogout: () => Promise<void>;
  onWithdraw: () => void;
}

const ProfileClientContent = ({
  profileForm,
  authError,
  settingsError,
  isLoggingOut,
  email,
  onLogout,
  onWithdraw,
}: ProfileClientContentProps) => {
  return (
    <ProfileFormView
      form={profileForm.form}
      formErrors={profileForm.formErrors}
      submitError={profileForm.submitError}
      authError={authError}
      settingsError={settingsError}
      isSubmitting={profileForm.isSubmitting}
      isReady={profileForm.isReady}
      isDirty={profileForm.isDirty}
      isLoggingOut={isLoggingOut}
      email={email}
      onLogout={onLogout}
      onWithdraw={onWithdraw}
      handleChange={profileForm.handleChange}
      handleSubmit={profileForm.handleSubmit}
    />
  );
};

const ProfileClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user, error, refetch } = useAuthGuard();
  const { handleLogout, handleWithdraw, isLoggingOut, settingsError } =
    useProfileSettingsActions();

  const profileForm = useProfileForm({
    refetch,
    onUnauthorized: () => prefetchAndReplace(router, "/login"),
  });
  const { loading } = profileClientStyle();

  useProfileClientSync({
    router,
    isLoading,
    isAuthenticated,
    user,
    setFormFromUser: profileForm.setFormFromUser,
  });

  useProfilePendingRedirect(router, isLoading, isAuthenticated, user?.status);

  if (isLoading) {
    return <div className={loading()}>로그인 상태 확인 중…</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user?.status === "PENDING") {
    return null;
  }

  return (
    <ProfileClientContent
      profileForm={profileForm}
      authError={error}
      settingsError={settingsError}
      isLoggingOut={isLoggingOut}
      email={user?.email}
      onLogout={handleLogout}
      onWithdraw={handleWithdraw}
    />
  );
};

export default ProfileClient;
