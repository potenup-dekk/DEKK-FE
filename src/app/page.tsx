"use client";

import { ControlButton } from "@/shared/components/Button";

import { Card } from "@/shared/components/Card";
import { RefreshCwIcon, ThumbsDown } from "lucide-react";
import { useEffect } from "react";

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

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex relative h-fit max-w-md w-full items-center justify-center m-2">
        <Card />
        {/* <Flip /> */}
        {/* <Spread /> */}
      </div>

      <div className="flex items-center justify-between w-full gap-2">
        <ControlButton
          icon={ThumbsDown}
          label="별로예요"
          onClick={() => {
            window.dispatchEvent(new Event("card:dislike"));
          }}
        />
        <ControlButton icon={RefreshCwIcon} label="뒤집기" color="secondary" />
        <ControlButton
          icon={ThumbsDown}
          label="마음에 들어요"
          onClick={() => {
            window.dispatchEvent(new Event("card:like"));
          }}
        />
      </div>
    </div>
  );
}
