import type { Variants } from "framer-motion";
import type { DeckOriginOffset } from "./deckState.helpers";

const getDeckSpreadHiddenVariant = () => {
  return {
    x: 0,
    y: 20,
    opacity: 0,
    scale: 0.96,
    rotate: 0,
  };
};

const getDeckSpreadVisibleVariant = (index: number) => {
  return {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 320,
      delay: index * 0.03,
    },
  };
};

const getDeckSpreadExitVariant = () => {
  return {
    x: 0,
    y: 12,
    opacity: 0,
    scale: 0.98,
    rotate: 0,
    transition: {
      type: "spring" as const,
      damping: 24,
      stiffness: 320,
    },
  };
};

const deckSpreadCardVariants = (origin: DeckOriginOffset): Variants => {
  void origin;

  return {
    hidden: getDeckSpreadHiddenVariant(),
    visible: (index: number) => {
      return getDeckSpreadVisibleVariant(index);
    },
    exit: (index: number) => {
      void index;
      return getDeckSpreadExitVariant();
    },
  };
};

export default deckSpreadCardVariants;
