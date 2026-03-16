import { Suspense } from "react";
import type { Metadata } from "next";
import OAuthRedirectClient from "./ui/OAuthRedirectClient";

export const metadata: Metadata = {
  title: "DEKK 로그인",
};

const OAuthRedirectPage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중…</div>}>
      <OAuthRedirectClient />
    </Suspense>
  );
};

export default OAuthRedirectPage;
