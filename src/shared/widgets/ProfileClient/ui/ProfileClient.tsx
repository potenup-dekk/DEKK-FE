"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/shared/hooks";
import useProfileForm from "../model/useProfileForm";
import useProfileClientSync from "../model/useProfileClientSync";
import { profileClientStyle } from "../style";
import ProfileFormView from "./ProfileFormView";

const ProfileClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user, error, refetch } = useAuthGuard();

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

  if (isLoading) {
    return <div className={loading()}>로그인 상태 확인 중…</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ProfileFormView
      form={profileForm.form}
      formErrors={profileForm.formErrors}
      submitError={profileForm.submitError}
      authError={error}
      isSubmitting={profileForm.isSubmitting}
      isReady={profileForm.isReady}
      email={user?.email}
      handleChange={profileForm.handleChange}
      handleSubmit={profileForm.handleSubmit}
    />
  );
};

export default ProfileClient;
