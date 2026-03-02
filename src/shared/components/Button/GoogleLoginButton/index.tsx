"use client";

import SocialButton from "../SocialButton";
import { USE_MOCK } from "@/shared/constants/config";
import { API_BASE } from "@/shared/config/env";

const GoogleLoginButton = () => {
  const handleClick = () => {
    if (USE_MOCK) {
      // 백엔드 없이 테스트: OAuth 성공한 것처럼 redirect 페이지로 이동
      window.location.href = `/oauth2/redirect?accessToken=mock_access_token`;
      return;
    }

    // 실제 백엔드 붙을 때만 사용
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
