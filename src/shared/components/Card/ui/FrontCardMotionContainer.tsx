import { motion } from "framer-motion";
import {
  cardResizeTransition,
  frontCardDragConstraints,
  frontCardMotionStyle,
  getFrontCardExit,
} from "../model/animate";
import { cardStyle } from "../style";
import type { FrontCardProps } from "../model/props.type";
import FrontCardFocusToggle from "./FrontCardFocusToggle";

interface FrontCardMotionContainerProps {
  cardId: string;
  x: FrontCardProps["x"];
  rotate: FrontCardProps["rotate"];
  targetCardHeight: number | null;
  shouldApplyCompressedCard: boolean;
  shouldShowFocusButton: boolean;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  onDragEnd: (_: unknown, info: { offset: { x: number } }) => void;
  children: React.ReactNode;
}

const FrontCardMotionContainer = ({
  cardId,
  x,
  rotate,
  targetCardHeight,
  shouldApplyCompressedCard,
  shouldShowFocusButton,
  isFocusMode,
  onToggleFocusMode,
  onDragEnd,
  children,
}: FrontCardMotionContainerProps) => {
  const { frontRoot } = cardStyle();

  return (
    <motion.div
      key={cardId}
      initial={false}
      className={frontRoot({ isCardCompressed: shouldApplyCompressedCard })}
      animate={targetCardHeight ? { height: targetCardHeight } : undefined}
      transition={cardResizeTransition}
      drag
      dragSnapToOrigin
      dragConstraints={frontCardDragConstraints}
      style={{ x, rotate, ...frontCardMotionStyle }}
      onDragEnd={onDragEnd}
      exit={getFrontCardExit(x.get())}
    >
      {children}
      {shouldShowFocusButton ? (
        <FrontCardFocusToggle
          isFocusMode={isFocusMode}
          onToggleFocusMode={onToggleFocusMode}
        />
      ) : null}
    </motion.div>
  );
};

export default FrontCardMotionContainer;
