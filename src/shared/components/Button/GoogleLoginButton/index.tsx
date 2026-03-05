"use client";

import SocialButton from "../SocialButton";
import { USE_MOCK } from "@/shared/constants/config";
import { API_BASE } from "@/shared/config/env";

const GoogleLoginButton = () => {
  const handleClick = () => {
    if (USE_MOCK) {
      window.location.href = `/oauth2/redirect?accessToken=mock_access_token`;
      return;
    }

    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <SocialButton
      iconSrc="/ico_google.png"
      iconAlt="구글 로그인"
      label="Google 로그인"
      onClick={handleClick}
      className="bg-white text-black border border-[#747775]"
    />
  );
};

export default GoogleLoginButton;
