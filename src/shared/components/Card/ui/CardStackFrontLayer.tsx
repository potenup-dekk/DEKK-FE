import FrontCard from "./FrontCard";
import type { UseCardStackResult } from "../model/useCardStack.types";
import type { CardDisplayOptions } from "../model/props.type";

interface CardStackFrontLayerProps {
  cardStack: UseCardStackResult;
  displayOptions: CardDisplayOptions;
}

const CardStackFrontLayer = ({
  cardStack,
  displayOptions,
}: CardStackFrontLayerProps) => {
  const { cards, frontImage } = cardStack;
  const frontCard = cards[0];

  if (!frontCard) return null;

  return (
    <FrontCard
      cardId={frontCard.id}
      cardNumericId={frontCard.cardId}
      frontImage={frontImage}
      products={frontCard.products}
      height={frontCard.height}
      weight={frontCard.weight}
      tags={frontCard.tags}
      x={cardStack.x}
      rotate={cardStack.rotate}
      rotateYSpring={cardStack.rotateYSpring}
      animateFlip={cardStack.animateFlip}
      setIsSwiping={cardStack.setIsSwiping}
      onLike={cardStack.onLike}
      onDislike={cardStack.onDislike}
      background={cardStack.background}
      opacity={cardStack.opacity}
      filter={cardStack.filter}
      backdropFilter={cardStack.backdropFilter}
      isCardCompressed={displayOptions.isCardCompressed}
      isFocusMode={displayOptions.isFocusMode}
      isFocusTransitioning={displayOptions.isFocusTransitioning}
      compressedCardHeight={displayOptions.compressedCardHeight}
      expandedCardHeight={displayOptions.expandedCardHeight}
      onToggleFocusMode={displayOptions.onToggleFocusMode}
      onOpenCustomDeckSheet={displayOptions.onOpenCustomDeckSheet}
    />
  );
};

export default CardStackFrontLayer;
