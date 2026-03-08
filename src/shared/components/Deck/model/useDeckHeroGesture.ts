import { animate, type PanInfo, useMotionValue } from "framer-motion";

interface UseDeckHeroGestureParams {
  onSwipeClose: () => void;
  onTapFlip: () => void;
  swipeCloseThreshold?: number;
}

interface UseDeckHeroGestureResult {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  onDragEnd: (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onTap: () => void;
}

const SWIPE_CLOSE_THRESHOLD = 100;

const useDeckHeroGesture = ({
  onSwipeClose,
  onTapFlip,
  swipeCloseThreshold = SWIPE_CLOSE_THRESHOLD,
}: UseDeckHeroGestureParams): UseDeckHeroGestureResult => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const resetPosition = () => {
    animate(x, 0, { duration: 0.2, ease: "easeOut" });
    animate(y, 0, { duration: 0.2, ease: "easeOut" });
  };

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = Math.hypot(info.offset.x, info.offset.y);

    if (dragDistance > swipeCloseThreshold) {
      onSwipeClose();
      resetPosition();
      return;
    }

    resetPosition();
  };

  const onTap = () => {
    onTapFlip();
  };

  return {
    x,
    y,
    onDragEnd,
    onTap,
  };
};

export default useDeckHeroGesture;
