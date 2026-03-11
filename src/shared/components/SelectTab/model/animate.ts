import type { Transition, Variants } from "framer-motion";

const selectIndicatorTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
};

const getSelectIndicatorAnimate = (activeIndex: number) => {
  return {
    x: `${activeIndex * 100}%`,
  };
};

const sectionVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -20 : 20,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 20 : -20,
  }),
};

const sectionTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

export {
  getSelectIndicatorAnimate,
  sectionTransition,
  sectionVariants,
  selectIndicatorTransition,
};
