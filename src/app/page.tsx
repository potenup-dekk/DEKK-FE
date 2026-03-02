"use client";

import { ActionButton, ControlButton } from "@/shared/components/Button";

import { Card } from "@/shared/components/Card";
import Flip from "@/shared/components/flip";
import Spread from "@/shared/components/spread";
import { RefreshCwIcon, ThumbsDown } from "lucide-react";
import Image from "next/image";
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
    <div className="flex flex-col h-dvh w-full items-center justify-center">
      <div className="flex relative h-full w-md items-center justify-center">
        <Card />
        {/* <Flip /> */}
        {/* <Spread /> */}
      </div>

      <div className="flex justify-between items-center">
        <ControlButton icon={ThumbsDown} label="별로예요" />
        <ControlButton icon={RefreshCwIcon} label="뒤집기" color="secondary" />
        <ControlButton icon={ThumbsDown} label="마음에 들어요" />
      </div>
    </div>
  );
}
