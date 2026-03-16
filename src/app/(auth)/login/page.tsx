import type { Metadata } from "next";
import LoginPageClient from "./ui/LoginPageClient";

export const metadata: Metadata = {
  title: "DEKK 로그인",
  description: "DEKK 회원이 되어 마음에 드는 핏을 수집하세요!",
};

const LoginPage = () => {
  return <LoginPageClient />;
};

export default LoginPage;
