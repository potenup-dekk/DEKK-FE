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
    <div className="flex h-full w-full flex-col items-center gap-3 overflow-hidden pb-2">
      <div className="relative flex w-full max-w-md min-h-0 flex-1 items-center justify-center">
        <Card />
      </div>

      <div className="relative z-20 flex w-5/6 shrink-0 items-center justify-between gap-1">
        <ControlButton
          icon={ThumbsDown}
          label="별로예요"
          onClick={() => {
            window.dispatchEvent(new Event("card:dislike"));
          }}
        />
        <ControlButton
          icon={RefreshCwIcon}
          label="뒤집기"
          color="secondary"
          onClick={() => {
            window.dispatchEvent(new Event("card:flip"));
          }}
        />
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
