import type { FrontCardProps } from "../model/props.type";
import FrontCardMotionContainer from "./FrontCardMotionContainer";

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

const createDragEndHandler = ({
  setIsSwiping,
  onLike,
  onDislike,
}: {
  setIsSwiping: FrontCardProps["setIsSwiping"];
  onLike: FrontCardProps["onLike"];
  onDislike: FrontCardProps["onDislike"];
}) => {
  return (_: unknown, info: { offset: { x: number } }) => {
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
  };
};

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
  const shouldShowFocusButton = isCardCompressed || isFocusMode;
  const shouldApplyCompressedCard =
    isCardCompressed && !isFocusMode && compressedCardHeight !== null;
  const targetCardHeight = shouldApplyCompressedCard
    ? compressedCardHeight
    : expandedCardHeight;
  const onDragEnd = createDragEndHandler({ setIsSwiping, onLike, onDislike });

  return (
    <FrontCardMotionContainer
      cardId={cardId}
      x={x}
      rotate={rotate}
      targetCardHeight={targetCardHeight}
      shouldApplyCompressedCard={shouldApplyCompressedCard}
      shouldShowFocusButton={shouldShowFocusButton}
      isFocusMode={isFocusMode}
      onToggleFocusMode={onToggleFocusMode}
      onDragEnd={onDragEnd}
    >
      {children}
    </FrontCardMotionContainer>
  );
};

export default FrontCardFrame;
