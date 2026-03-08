const frontCardDragConstraints = {
  left: -80,
  right: 80,
  top: -80,
  bottom: 80,
} as const;

const frontCardMotionStyle = {
  perspective: 1000,
  WebkitPerspective: 1000,
} as const;

const frontCardFlipStyle = {
  transformStyle: "preserve-3d",
  WebkitTransformStyle: "preserve-3d",
} as const;

const backFaceMotionStyle = {
  rotateY: 180,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
} as const;

const getFrontCardExit = (x: number) => {
  return {
    zIndex: 0,
    opacity: 0,
    scale: 0.8,
    x,
    transition: { duration: 0.3 },
  };
};

const swipeAnimationTransition = {
  duration: 0.2,
  ease: "easeOut",
} as const;

const flipAnimationTransition = {
  duration: 0.2,
  ease: "easeInOut",
} as const;

const backCardScaleAnimation = {
  duration: 0.4,
  type: "spring",
  stiffness: 300,
  damping: 20,
} as const;

export {
  backCardScaleAnimation,
  backFaceMotionStyle,
  flipAnimationTransition,
  frontCardDragConstraints,
  frontCardFlipStyle,
  frontCardMotionStyle,
  getFrontCardExit,
  swipeAnimationTransition,
};
