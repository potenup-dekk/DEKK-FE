import { useEffect, useRef } from "react";
import type { FrontCardProps } from "../model/props.type";
import FrontCardMotionContainer from "./FrontCardMotionContainer";

interface FrontCardFrameProps {
  cardId: string;
  cardNumericId: number;
  x: FrontCardProps["x"];
  rotate: FrontCardProps["rotate"];
  rotateYSpring: FrontCardProps["rotateYSpring"];
  isSwipeEnabled: boolean;
  setIsSwiping: FrontCardProps["setIsSwiping"];
  onLike: FrontCardProps["onLike"];
  onDislike: FrontCardProps["onDislike"];
  isCardCompressed: FrontCardProps["isCardCompressed"];
  isFocusMode: FrontCardProps["isFocusMode"];
  isFocusTransitioning: FrontCardProps["isFocusTransitioning"];
  compressedCardHeight: FrontCardProps["compressedCardHeight"];
  expandedCardHeight: FrontCardProps["expandedCardHeight"];
  onToggleFocusMode: FrontCardProps["onToggleFocusMode"];
  onOpenCustomDeckSheet: FrontCardProps["onOpenCustomDeckSheet"];
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
  cardNumericId,
  x,
  rotate,
  rotateYSpring,
  isSwipeEnabled,
  setIsSwiping,
  onLike,
  onDislike,
  isCardCompressed,
  isFocusMode,
  isFocusTransitioning,
  compressedCardHeight,
  expandedCardHeight,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
  children,
}: FrontCardFrameProps) => {
  const isSwipeEnabledRef = useRef(isSwipeEnabled);

  useEffect(() => {
    isSwipeEnabledRef.current = isSwipeEnabled;
  }, [isSwipeEnabled]);

  useEffect(() => {
    if (isSwipeEnabled) {
      return;
    }

    x.set(0);
    setIsSwiping(false);
  }, [isSwipeEnabled, setIsSwiping, x]);

  const shouldApplyCompressedCard =
    isCardCompressed && !isFocusMode && compressedCardHeight !== null;
  const targetCardHeight = shouldApplyCompressedCard
    ? compressedCardHeight
    : expandedCardHeight;

  const baseOnDragEnd = createDragEndHandler({
    setIsSwiping,
    onLike,
    onDislike,
  });

  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (!isSwipeEnabledRef.current) {
      setIsSwiping(false);
      return;
    }

    baseOnDragEnd(_, info);
  };

  return (
    <FrontCardMotionContainer
      cardId={cardId}
      x={x}
      rotate={rotate}
      rotateYSpring={rotateYSpring}
      targetCardHeight={targetCardHeight}
      isSwipeEnabled={isSwipeEnabled}
      isCardCompressed={isCardCompressed}
      shouldApplyCompressedCard={shouldApplyCompressedCard}
      isFocusMode={isFocusMode}
      onToggleFocusMode={onToggleFocusMode}
      cardNumericId={cardNumericId}
      onOpenCustomDeckSheet={onOpenCustomDeckSheet}
      onDragEnd={onDragEnd}
    >
      {children}
    </FrontCardMotionContainer>
  );
};

export default FrontCardFrame;
