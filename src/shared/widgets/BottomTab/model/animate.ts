import type { Transition, Variants } from "framer-motion";

const bottomTabTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 32,
  mass: 1.05,
};

const BOTTOM_TAB_HIDE_DELAY = 0.12;
const BOTTOM_TAB_SHOW_DELAY = 0.16;

const bottomTabVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 88,
    height: 0,
    visibility: "hidden",
    transition: {
      ...bottomTabTransition,
      delay: BOTTOM_TAB_HIDE_DELAY,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    height: 80,
    visibility: "visible",
    transition: {
      ...bottomTabTransition,
      delay: BOTTOM_TAB_SHOW_DELAY,
    },
  },
};

export { bottomTabVariants };
