import {
  animate,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { backCardScaleAnimation } from "./animate";

const MAX_X = 250;
const MAX_ROTATE = 12;

const useCardMotion = (
  x: ReturnType<typeof useMotionValue<number>>,
  removingCardId: string | null,
) => {
  const rotate = useTransform(
    x,
    [-MAX_X, 0, MAX_X],
    [-MAX_ROTATE, 0, MAX_ROTATE],
  );

  const blur = useTransform(x, [-100, 0, 100], [8, 0, 8]);
  const background = useTransform(
    x,
    [-MAX_X, 0, MAX_X],
    ["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)", "rgba(29, 154, 39, 0.6)"],
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const opacity = useTransform(x, [-50, 0, 50], [1, 0, 1]);
  const filter = useMotionTemplate`drop-shadow(0px 5px 15px rgba(0, 0, 0, calc(${opacity}/3.5)))`;

  const backCardScale = useTransform(x, [-MAX_X, 0, MAX_X], [1, 0.9, 1]);
  const backScale = useMotionValue(0.9);

  useEffect(() => {
    const unsubscribe = backCardScale.on("change", (latest) => {
      if (!removingCardId) backScale.set(latest);
    });

    let controls: ReturnType<typeof animate> | undefined;

    if (removingCardId) {
      controls = animate(backScale, 1, { ...backCardScaleAnimation });
    } else {
      backScale.set(backCardScale.get());
    }

    return () => {
      unsubscribe();
      controls?.stop();
    };
  }, [removingCardId, backCardScale, backScale]);

  return { rotate, background, backdropFilter, opacity, filter, backScale };
};

export default useCardMotion;
