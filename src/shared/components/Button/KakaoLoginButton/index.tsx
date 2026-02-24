"use client";

import { signIn } from "next-auth/react";
import SocialButton from "../SocialButton";

const KakaoLoginButton = () => {
  return (
    <SocialButton
      iconSrc="/ico_kakao.png"
      iconAlt="카카오 로그인"
      label="카카오 로그인"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-[#FEE500] text-black"
    ></SocialButton>
  );
};

export default KakaoLoginButton;
