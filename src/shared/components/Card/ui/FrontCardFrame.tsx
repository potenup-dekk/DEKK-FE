import { motion } from "framer-motion";
import clsx from "clsx";
import {
  cardResizeTransition,
  frontCardDragConstraints,
  frontCardMotionStyle,
  getFrontCardExit,
} from "../model/animate";
import { cardStyle } from "../style";
import type { FrontCardProps } from "../model/props.type";
import { Maximize2Icon, Minimize2Icon } from "lucide-react";

interface FrontCardFrameProps {
  cardId: string;
  x: FrontCardProps["x"];
  rotate: FrontCardProps["rotate"];
  setIsSwiping: FrontCardProps["setIsSwiping"];
  onLike: FrontCardProps["onLike"];
  onDislike: FrontCardProps["onDislike"];
  isCardCompressed: FrontCardProps["isCardCompressed"];
  isFocusMode: FrontCardProps["isFocusMode"];
  compressedCardHeight: FrontCardProps["compressedCardHeight"];
  expandedCardHeight: FrontCardProps["expandedCardHeight"];
  onToggleFocusMode: FrontCardProps["onToggleFocusMode"];
  children: React.ReactNode;
}

const FrontCardFrame = ({
  cardId,
  x,
  rotate,
  setIsSwiping,
  onLike,
  onDislike,
  isCardCompressed,
  isFocusMode,
  compressedCardHeight,
  expandedCardHeight,
  onToggleFocusMode,
  children,
}: FrontCardFrameProps) => {
  const { frontRoot, focusToggleButton } = cardStyle();
  const shouldShowFocusButton = isCardCompressed || isFocusMode;
  const shouldApplyCompressedCard =
    isCardCompressed && !isFocusMode && compressedCardHeight !== null;
  const targetCardHeight = shouldApplyCompressedCard
    ? compressedCardHeight
    : expandedCardHeight;
  const FocusIcon = isFocusMode ? Minimize2Icon : Maximize2Icon;

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
      style={{
        x,
        rotate,
        ...frontCardMotionStyle,
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          setIsSwiping(true);
          if (info.offset.x > 0) {
            onLike();
          } else {
            onDislike();
          }
          return;
        }

        setIsSwiping(false);
      }}
      exit={getFrontCardExit(x.get())}
    >
      {children}

      {shouldShowFocusButton ? (
        <button
          type="button"
          className={clsx(focusToggleButton())}
          onClick={onToggleFocusMode}
          aria-label={
            isFocusMode ? "기본 화면으로 복귀" : "카드 집중 모드 열기"
          }
        >
          <FocusIcon size={20} strokeWidth={2.2} />
        </button>
      ) : null}
    </motion.div>
  );
};

export default FrontCardFrame;
