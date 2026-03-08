"use client";

import { useEffect } from "react";
import Card from "@/shared/components/Card";
import useHomePageAuth from "../model/useHomePageAuth";
import HomeCardControls from "./HomeCardControls";
import { homePageStyle } from "./style";

const HomePageClient = () => {
  useHomePageAuth();
  const { page, cardWrap } = homePageStyle();

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
    <div className={page()}>
      <div className={cardWrap()}>
        <Card />
      </div>

      <HomeCardControls />
    </div>
  );
};

export default HomePageClient;
