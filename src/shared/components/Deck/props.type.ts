import { MotionStyle } from "framer-motion";

interface DeckCardProps {
  style?: MotionStyle;
}

interface DeckCoverProps {
  onClick?: () => void;

  style?: MotionStyle;
}

export type { DeckCardProps, DeckCoverProps };
