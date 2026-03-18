"use client";

import SocialButton from "../SocialButton";
import { API_BASE } from "@/shared/config/env";

const GoogleLoginButton = () => {
  const handleClick = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <SocialButton
      iconSrc="/icons/google.svg"
      iconAlt="구글 로그인"
      label="Google 로그인"
      onClick={handleClick}
      className="bg-white text-black border border-[#747775]"
    />
  );
};

export default GoogleLoginButton;
