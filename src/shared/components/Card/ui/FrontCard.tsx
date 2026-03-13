"use client";

import FrontCardOverlay from "./FrontCardOverlay";
import FrontCardFrame from "./FrontCardFrame";
import FrontCardBody from "./FrontCardBody";
import type { FrontCardProps } from "../model/props.type";
import useFrontCardOpacity from "../model/useFrontCardOpacity";

const FrontCard = (props: FrontCardProps) => {
  const { cardId, x } = props;
  const { likeOpacity, dislikeOpacity } = useFrontCardOpacity(props.x);

  return (
    <FrontCardFrame
      cardId={cardId}
      cardNumericId={props.cardNumericId}
      x={x}
      rotate={props.rotate}
      rotateYSpring={props.rotateYSpring}
      setIsSwiping={props.setIsSwiping}
      onLike={props.onLike}
      onDislike={props.onDislike}
      isCardCompressed={props.isCardCompressed}
      isFocusMode={props.isFocusMode}
      compressedCardHeight={props.compressedCardHeight}
      expandedCardHeight={props.expandedCardHeight}
      onToggleFocusMode={props.onToggleFocusMode}
      onOpenCustomDeckSheet={props.onOpenCustomDeckSheet}
    >
      <FrontCardOverlay
        background={props.background}
        opacity={props.opacity}
        filter={props.filter}
        backdropFilter={props.backdropFilter}
        likeOpacity={likeOpacity}
        dislikeOpacity={dislikeOpacity}
      />

      <FrontCardBody
        rotateYSpring={props.rotateYSpring}
        x={x}
        animateFlip={props.animateFlip}
        frontImage={props.frontImage}
        products={props.products ?? []}
        height={props.height ?? null}
        weight={props.weight ?? null}
        tags={props.tags ?? null}
      />
    </FrontCardFrame>
  );
};

export default FrontCard;
