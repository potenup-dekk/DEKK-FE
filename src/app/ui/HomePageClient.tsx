"use client";

import useHomePageClientRuntime from "../model/useHomePageClientRuntime";
import HomePageClientView from "./HomePageClientView";

const HomePageClient = () => {
  const runtime = useHomePageClientRuntime();

  return (
    <HomePageClientView
      pageRef={runtime.pageRef}
      cardWrapRef={runtime.cardWrapRef}
      controlsRef={runtime.controlsRef}
      isFocusMode={runtime.isFocusMode}
      isFocusTransitioning={runtime.isFocusTransitioning}
      transitionOffsetY={runtime.transitionOffsetY}
      isCardCompressed={runtime.isCardCompressed}
      expandedCardHeight={runtime.expandedCardHeight}
      compressedCardHeight={runtime.compressedCardHeight}
      onToggleFocusMode={runtime.handleToggleFocusMode}
      onOpenCustomDeckSheet={runtime.openCustomDeckSheet}
      isCustomDeckSheetOpen={runtime.isCustomDeckSheetOpen}
      customDeckTargetCardId={runtime.customDeckTargetCardId}
      onCloseCustomDeckSheet={runtime.closeCustomDeckSheet}
    />
  );
};

export default HomePageClient;
