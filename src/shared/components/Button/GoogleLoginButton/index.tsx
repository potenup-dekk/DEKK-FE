"use client";

import { signIn } from "next-auth/react";
import SocialButton from "../SocialButton";

const GoogleLoginButton = () => {
  return (
    <SocialButton
      iconSrc="/ico_google.png"
      iconAlt="구글 로그인"
      label="Google 로그인"
      onClick={() => signIn("google", { callbackUrl: "/join" })}
      className="bg-white text-black border border-[#747775]"
    ></SocialButton>
  );
};

export default GoogleLoginButton;
