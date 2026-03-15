import type { Transition, Variants } from "framer-motion";

const bottomTabTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 32,
  mass: 1.05,
};

const BOTTOM_TAB_HIDE_DELAY = 0;
const BOTTOM_TAB_SHOW_DELAY = 0;

const bottomTabVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 88,
    visibility: "hidden",
    transition: {
      ...bottomTabTransition,
      delay: BOTTOM_TAB_HIDE_DELAY,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    visibility: "visible",
    transition: {
      ...bottomTabTransition,
      delay: BOTTOM_TAB_SHOW_DELAY,
    },
  },
};

export { bottomTabVariants };
