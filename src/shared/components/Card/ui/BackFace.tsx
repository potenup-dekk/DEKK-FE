"use client";

import React, { useEffect, useRef } from "react";
import { BackFaceProps } from "../props.type";
import { motion } from "framer-motion";
import Tag from "../../Badge";
import { useCardAuth } from "../model/cardAuthContext";
import { backFaceMotionStyle } from "../model/animate";
import { MOCK_PRODUCTS } from "../model/mockProducts";
import ProductList from "@/shared/components/ProductList";
import { GoogleLoginButton, KakaoLoginButton } from "../../Button";

const SCROLL_UNLOCK_DELAY = 120;

const BackFace = ({
  products,
  tags,
  onProductScrollInteractionChange,
}: BackFaceProps) => {
  const { isLoggedIn } = useCardAuth();
  const guestPreviewProducts = MOCK_PRODUCTS.slice(0, 1);
  const scrollUnlockTimerRef = useRef<number | null>(null);
  const didScrollRef = useRef(false);

  const clearScrollUnlockTimer = () => {
    if (scrollUnlockTimerRef.current === null) {
      return;
    }

    window.clearTimeout(scrollUnlockTimerRef.current);
    scrollUnlockTimerRef.current = null;
  };

  const lockSwipe = () => {
    onProductScrollInteractionChange?.(true);
  };

  const canScrollVertically = (element: HTMLDivElement) => {
    return element.scrollHeight > element.clientHeight;
  };

  const handleInteractionStart = (
    event: React.SyntheticEvent<HTMLDivElement>,
  ) => {
    const element = event.currentTarget;

    if (!canScrollVertically(element)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const nativeEvent = event.nativeEvent as Event & {
      stopImmediatePropagation?: () => void;
    };
    nativeEvent.stopImmediatePropagation?.();

    lockSwipe();
  };

  const unlockSwipe = () => {
    onProductScrollInteractionChange?.(false);
  };

  const scheduleSwipeUnlock = () => {
    clearScrollUnlockTimer();
    scrollUnlockTimerRef.current = window.setTimeout(() => {
      unlockSwipe();
      scrollUnlockTimerRef.current = null;
    }, SCROLL_UNLOCK_DELAY);
  };

  const handleProductScroll = () => {
    didScrollRef.current = true;
    lockSwipe();
    scheduleSwipeUnlock();
  };

  const handleInteractionRelease = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const element = event.currentTarget;

    if (canScrollVertically(element)) {
      event.stopPropagation();
    }

    if (didScrollRef.current) {
      event.stopPropagation();
      didScrollRef.current = false;
    }

    scheduleSwipeUnlock();
  };

  useEffect(() => {
    return () => {
      clearScrollUnlockTimer();
      unlockSwipe();
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex p-6 text-white bg-white rounded-lg"
      style={backFaceMotionStyle}
    >
      <div className="flex flex-col flex-1 gap-5">
        {!isLoggedIn ? (
          <div className="flex flex-col flex-1 w-full gap-3">
            <div className="relative overflow-hidden rounded-md">
              <div className="h-11 overflow-hidden">
                <ProductList items={guestPreviewProducts} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent via-white/70 to-white" />
            </div>

            <p className="text-center text-sm font-bold text-primary">
              로그인 후 코디 상세 정보를 확인할 수 있어요!
            </p>

            <div className="flex flex-col items-center gap-2">
              <GoogleLoginButton />
              <KakaoLoginButton />
            </div>
          </div>
        ) : (
          <div
            className="min-h-0 flex-1 overflow-y-auto touch-pan-y pr-1"
            onScroll={handleProductScroll}
            onPointerDown={handleInteractionStart}
            onMouseDown={handleInteractionStart}
            onPointerUp={handleInteractionRelease}
            onMouseUp={handleInteractionRelease}
            onPointerCancel={handleInteractionRelease}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionRelease}
            onTouchCancel={handleInteractionRelease}
          >
            {products ? <ProductList items={products} useCdn /> : null}
          </div>
        )}

        <div className="flex max-h-16 flex-wrap content-start overflow-hidden">
          {tags && tags.map((tag, index) => <Tag key={index} label={tag} />)}
        </div>
      </div>
    </motion.div>
  );
};

export default BackFace;
