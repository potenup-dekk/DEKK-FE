import { AnimatePresence, motion } from "framer-motion";
import { Children } from "react";
import { sectionTransition, sectionVariants } from "../model/animate";
import type { SectionProps } from "../props.type";
import { selectTabStyle } from "../style";
import { useSelectTabContext } from "./context";

const Section = ({ children }: SectionProps) => {
  const { activeIndex, direction } = useSelectTabContext();
  const sectionViews = Children.toArray(children);
  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(sectionViews.length - 1, 0),
  );
  const activeView = sectionViews[safeActiveIndex] ?? null;
  const { sectionContainer } = selectTabStyle();

  return (
    <div className={sectionContainer()}>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={`section-${safeActiveIndex}`}
          custom={direction}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={sectionTransition}
        >
          {activeView}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Section;
