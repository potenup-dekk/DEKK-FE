"use client";

import Image from "next/image";
import {
  GoogleLoginButton,
  KakaoLoginButton,
} from "../../../shared/components/Button";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto h-screen gap-2.5 max-w-75 py-12">
        <div className="flex flex-1 items-center">
          <Image
            src="/logo_dekk.png"
            alt="DEKK"
            width={203}
            height={81}
          ></Image>
        </div>
        <div className="flex flex-col gap-3">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>
      </div>
    </>
  );
}
