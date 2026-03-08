import { motion } from "framer-motion";
import clsx from "clsx";
import DeckCover from "./DeckCover";
import DeckCardList from "./DeckCardList";

interface DeckFrameProps {
  isOpen: boolean;
  isCollapsedAfterAnimation: boolean;
  visibleCardIndexes: number[];
  handleCoverClick: () => void;
}

const DeckFrame = ({
  isOpen,
  isCollapsedAfterAnimation,
  visibleCardIndexes,
  handleCoverClick,
}: DeckFrameProps) => {
  return (
    <motion.div
      className={clsx(
        "grid-cols-3 gap-5",
        isOpen
          ? "fixed inset-y-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 overflow-y-auto p-5"
          : "relative z-10",
      )}
      style={{ display: isOpen ? "grid" : "flex" }}
    >
      <DeckCover
        onClick={handleCoverClick}
        style={{ display: isOpen ? "absolute" : "" }}
      />
      <DeckCardList
        isOpen={isOpen}
        isCollapsedAfterAnimation={isCollapsedAfterAnimation}
        visibleCardIndexes={visibleCardIndexes}
      />
    </motion.div>
  );
};

export default DeckFrame;
