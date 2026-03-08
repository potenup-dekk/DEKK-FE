import { motion } from "framer-motion";
import DeckCard from "./DeckCard";
import { deckCardLayoutTransition } from "../model/animate";

interface DeckCardListProps {
  isOpen: boolean;
  isCollapsedAfterAnimation: boolean;
  visibleCardIndexes: number[];
}

const DeckCardList = ({
  isOpen,
  isCollapsedAfterAnimation,
  visibleCardIndexes,
}: DeckCardListProps) => {
  return (
    <>
      {visibleCardIndexes.map((cardIndex) => (
        <motion.div
          key={cardIndex}
          layout
          transition={deckCardLayoutTransition}
          className={isOpen ? "" : "absolute"}
        >
          <DeckCard
            style={
              isCollapsedAfterAnimation
                ? {
                    rotate: (cardIndex + 1) * 4,
                  }
                : undefined
            }
          />
        </motion.div>
      ))}
    </>
  );
};

export default DeckCardList;
