import FrontCard from "./FrontCard";
import type { UseCardStackResult } from "../model/useCardStack.types";

interface CardStackFrontLayerProps {
  cardStack: UseCardStackResult;
}

const CardStackFrontLayer = ({ cardStack }: CardStackFrontLayerProps) => {
  const { cards, frontImage } = cardStack;
  const frontCard = cards[0];

  if (!frontCard) return null;

  return (
    <FrontCard
      cardId={frontCard.id}
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
    />
  );
};

export default CardStackFrontLayer;
