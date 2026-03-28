import { animate, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { flipAnimationTransition } from "./animate";

const useCardFlip = (frontCardId?: string) => {
  const isFlippedRef = useRef(false);
  const rotateY = useMotionValue(0);
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const resetFlipState = useCallback(() => {
    isFlippedRef.current = false;
    rotateY.jump(0);
    rotateYSpring.jump(0);
  }, [rotateY, rotateYSpring]);

  const animateFlip = useCallback(() => {
    const next = !isFlippedRef.current;
    isFlippedRef.current = next;
    animate(rotateY, next ? 180 : 0, flipAnimationTransition);
  }, [rotateY]);

  useEffect(() => {
    resetFlipState();
  }, [frontCardId, resetFlipState]);

  useEffect(() => {
    const handleFlipTrigger = () => animateFlip();
    window.addEventListener("card:flip", handleFlipTrigger);

    return () => {
      window.removeEventListener("card:flip", handleFlipTrigger);
    };
  }, [animateFlip]);

  return { rotateYSpring, animateFlip, resetFlipState };
};

export default useCardFlip;
