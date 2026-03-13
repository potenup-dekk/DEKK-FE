import { motion, useTransform } from "framer-motion";
import {
  cardResizeTransition,
  frontFaceOnlyStyle,
  frontCardFlipStyle,
  frontCardDragConstraints,
  frontCardMotionStyle,
  getFrontCardExit,
} from "../model/animate";
import { cardStyle } from "../style";
import type { FrontCardProps } from "../model/props.type";
import FrontCardFocusToggle from "./FrontCardFocusToggle";

interface FrontCardMotionContainerProps {
  cardId: string;
  cardNumericId: number;
  x: FrontCardProps["x"];
  rotate: FrontCardProps["rotate"];
  rotateYSpring: FrontCardProps["rotateYSpring"];
  targetCardHeight: number | null;
  shouldApplyCompressedCard: boolean;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  onOpenCustomDeckSheet: (cardId: number) => void;
  onDragEnd: (_: unknown, info: { offset: { x: number } }) => void;
  children: React.ReactNode;
}

const FrontCardMotionContainer = ({
  cardId,
  cardNumericId,
  x,
  rotate,
  rotateYSpring,
  targetCardHeight,
  shouldApplyCompressedCard,
  isFocusMode,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
  onDragEnd,
  children,
}: FrontCardMotionContainerProps) => {
  const { frontRoot } = cardStyle();
  const frontFaceOverlayOpacity = useTransform(
    rotateYSpring,
    [0, 70, 100, 180],
    [1, 1, 0, 0],
  );

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
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateY: rotateYSpring,
          opacity: frontFaceOverlayOpacity,
          ...frontCardFlipStyle,
        }}
      >
        <div style={frontFaceOnlyStyle}>
          <FrontCardFocusToggle
            cardId={cardNumericId}
            isFocusMode={isFocusMode}
            onToggleFocusMode={onToggleFocusMode}
            onOpenCustomDeckSheet={onOpenCustomDeckSheet}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FrontCardMotionContainer;
