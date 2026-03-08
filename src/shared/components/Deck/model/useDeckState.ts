import { useEffect, useRef, useState } from "react";
import {
  COLLAPSED_CARD_COUNT,
  COLLAPSED_CARD_INDEXES,
  clearScheduledTasks,
  scheduleCollapse,
  scheduleOpen,
} from "./deckState.helpers";

interface UseDeckStateResult {
  isOpen: boolean;
  visibleCardIndexes: number[];
  isCollapsedAfterAnimation: boolean;
  handleCoverClick: () => void;
}

const useDeckState = (): UseDeckStateResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCardIndexes, setVisibleCardIndexes] = useState(
    COLLAPSED_CARD_INDEXES,
  );
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleCoverClick = () => {
    clearScheduledTasks(closeTimeoutRef, animationFrameRef);

    if (isOpen) {
      setIsOpen(false);
      scheduleCollapse(closeTimeoutRef, setVisibleCardIndexes);
      return;
    }

    scheduleOpen(animationFrameRef, setVisibleCardIndexes, setIsOpen);
  };

  useEffect(() => {
    return () => {
      clearScheduledTasks(closeTimeoutRef, animationFrameRef);
    };
  }, []);

  return {
    isOpen,
    visibleCardIndexes,
    isCollapsedAfterAnimation:
      !isOpen && visibleCardIndexes.length === COLLAPSED_CARD_COUNT,
    handleCoverClick,
  };
};

export default useDeckState;
