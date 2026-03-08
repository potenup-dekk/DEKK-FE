import { Suspense } from "react";
import OAuthRedirectClient from "./ui/OAuthRedirectClient";

const OAuthRedirectPage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중…</div>}>
      <OAuthRedirectClient />
    </Suspense>
  );
};

export default OAuthRedirectPage;
