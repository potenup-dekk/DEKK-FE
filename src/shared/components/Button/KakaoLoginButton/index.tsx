"use client";

import SocialButton from "../SocialButton";
import { API_BASE } from "@/shared/config/env";

const KakaoLoginButton = () => {
  const handleClick = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/kakao`;
  };

  return (
    <SocialButton
      iconSrc="/ico_kakao.png"
      iconAlt="카카오 로그인"
      label="카카오 로그인"
      onClick={handleClick}
      className="bg-[#FEE500] text-black"
    />
  );
};

export default KakaoLoginButton;
