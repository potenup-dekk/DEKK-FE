"use client";

import SocialButton from "../SocialButton";
import { USE_MOCK } from "@/shared/constants/config";
import { API_BASE } from "@/shared/config/env";

const KakaoLoginButton = () => {
  const handleClick = () => {
    if (USE_MOCK) {
      window.location.href = `/oauth2/redirect?accessToken=mock_access_token_kakao`;
      return;
    }
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
