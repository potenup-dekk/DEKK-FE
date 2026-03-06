"use client";

import { useEffect, useState } from "react";
import { requestJson } from "@/shared/api/client";
import { clearTokens } from "@/shared/auth/tokenStorage";
import ControlButton from "@/shared/components/Button/ControlButton";
import { Card } from "@/shared/components/Card";
import { ThumbsDown, RefreshCwIcon, HeartIcon } from "lucide-react";

type ApiResponse<T> = { code: string; message: string; data: T };
type Me = { email: string; status: "PENDING" | "ACTIVE" };

export default function Home() {
  useEffect(() => {
    // if (!true) return;

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverscroll = documentElement.style.overscrollBehavior;

    body.style.overflow = "hidden";
    body.style.touchAction = "none"; // 모바일 터치 스크롤 방지
    documentElement.style.overscrollBehavior = "none"; // 바운스/체인 스크롤 방지

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      documentElement.style.overscrollBehavior = prevHtmlOverscroll;
    };
  }, []);

  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await requestJson<ApiResponse<Me>>("/w/v1/users/me", {
          method: "GET",
        });

        // 온보딩 미완료면 join으로 라우팅
        if (res.data.status === "PENDING") {
          await clearTokens();
          setMe(null);
          return;
        }

        setMe(res.data);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-3">
      <div className="flex relative max-w-md w-full items-center justify-center">
        <Card />
      </div>

      <div className="flex items-center justify-between w-5/6 gap-1">
        <ControlButton
          icon={ThumbsDown}
          label="별로예요"
          onClick={() => {
            window.dispatchEvent(new Event("card:dislike"));
          }}
        />
        <ControlButton icon={RefreshCwIcon} label="뒤집기" color="secondary" />
        <ControlButton
          icon={HeartIcon}
          label="마음에 들어요"
          onClick={() => {
            window.dispatchEvent(new Event("card:like"));
          }}
        />
      </div>
    </div>
  );
}
