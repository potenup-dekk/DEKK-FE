"use client";

import { motion } from "framer-motion";
import type {
  DeckCardItem,
  DeckOriginOffset,
} from "../model/deckState.helpers";
import { deckSpreadCardVariants } from "../model/animate";
import { toDeckCardLayoutId } from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCardImage from "./DeckCardImage";

interface DeckCardProps {
  card: DeckCardItem;
  index: number;
  radialOrigin: DeckOriginOffset;
  isClosing: boolean;
  onSelect: (cardId: number) => void;
}

const DeckCard = ({
  card,
  index,
  radialOrigin,
  isClosing,
  onSelect,
}: DeckCardProps) => {
  const { cardButton, cardImage } = deckStyle();
  const variants = deckSpreadCardVariants(radialOrigin);

  return (
    <motion.div
      className="w-full"
      custom={index}
      variants={variants}
      initial="hidden"
      animate={isClosing ? "exit" : "visible"}
    >
      <motion.button
        type="button"
        className={cardButton()}
        onClick={() => {
          if (isClosing) {
            return;
          }

          onSelect(card.id);
        }}
        whileTap={{ scale: 0.97 }}
        layoutId={toDeckCardLayoutId(card.id)}
      >
        <div className="relative h-full w-full">
          <DeckCardImage
            src={card.imageSrc}
            alt={card.name}
            className={cardImage()}
          />
        </div>
      </motion.button>
    </motion.div>
  );
};

export default DeckCard;
