import type { Transition, Variants } from "framer-motion";

const headerTransition: Transition = {
  type: "spring",
  stiffness: 210,
  damping: 30,
  mass: 1.05,
};

const HEADER_HIDE_DELAY = 0.12;
const HEADER_SHOW_DELAY = 0.16;

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
    height: 0,
    transition: {
      ...headerTransition,
      delay: HEADER_HIDE_DELAY,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    height: 64,
    transition: {
      ...headerTransition,
      delay: HEADER_SHOW_DELAY,
    },
  },
};

export { headerVariants };
