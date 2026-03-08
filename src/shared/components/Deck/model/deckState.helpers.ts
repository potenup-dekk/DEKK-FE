const COLLAPSED_CARD_COUNT = 2;
const TOTAL_CARD_COUNT = 50;
const CLOSE_ANIMATION_DELAY = 300;

const ALL_CARD_INDEXES = Array.from(
  { length: TOTAL_CARD_COUNT },
  (_, index) => index,
);
const COLLAPSED_CARD_INDEXES = ALL_CARD_INDEXES.slice(0, COLLAPSED_CARD_COUNT);

const clearScheduledTasks = (
  closeTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  animationFrameRef: React.MutableRefObject<number | null>,
) => {
  if (closeTimeoutRef.current) {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }

  if (animationFrameRef.current) {
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }
};

const scheduleCollapse = (
  closeTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  setVisibleCardIndexes: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  closeTimeoutRef.current = setTimeout(() => {
    setVisibleCardIndexes(COLLAPSED_CARD_INDEXES);
  }, CLOSE_ANIMATION_DELAY);
};

const scheduleOpen = (
  animationFrameRef: React.MutableRefObject<number | null>,
  setVisibleCardIndexes: React.Dispatch<React.SetStateAction<number[]>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setVisibleCardIndexes(ALL_CARD_INDEXES);
  animationFrameRef.current = requestAnimationFrame(() => {
    setIsOpen(true);
    animationFrameRef.current = null;
  });
};

export {
  COLLAPSED_CARD_COUNT,
  COLLAPSED_CARD_INDEXES,
  clearScheduledTasks,
  scheduleCollapse,
  scheduleOpen,
};
