import { useCallback, useRef } from "react";
import useHomeCustomDeckSheet from "./useHomeCustomDeckSheet";
import useHomeFocusMode from "./useHomeFocusMode";
import useHomePageAuth from "./useHomePageAuth";
import useHomePageClientEffects from "./useHomePageClientEffects";
import { useHomeCardLayout } from "./useHomeCardLayout";

const useHomePageClientRuntime = () => {
  useHomePageAuth();

  const {
    closeCustomDeckSheet,
    customDeckTargetCardId,
    isCustomDeckSheetOpen,
    openCustomDeckSheet,
  } = useHomeCustomDeckSheet();

  const pageRef = useRef<HTMLDivElement>(null);
  const {
    focusTransitionDirection,
    isFocusMode,
    isFocusTransitioning,
    setFocusTransitionDirection,
    setIsFocusTransitioning,
    toggleFocusMode,
  } = useHomeFocusMode();
  const cardLayout = useHomeCardLayout(isFocusMode, isFocusTransitioning);

  const handleToggleFocusMode = useCallback(() => {
    if (!cardLayout.isCardCompressed && !isFocusMode) return;

    toggleFocusMode(cardLayout.isCardCompressed);
  }, [cardLayout.isCardCompressed, isFocusMode, toggleFocusMode]);

  useHomePageClientEffects({
    focusTransitionDirection,
    measureCardLayout: cardLayout.measureCardLayout,
    isFocusMode,
    isFocusTransitioning,
    setFocusTransitionDirection,
    setIsFocusTransitioning,
  });

  return {
    closeCustomDeckSheet,
    customDeckTargetCardId,
    handleToggleFocusMode,
    isCustomDeckSheetOpen,
    isFocusMode,
    isFocusTransitioning,
    openCustomDeckSheet,
    pageRef,
    ...cardLayout,
  };
};

export default useHomePageClientRuntime;
