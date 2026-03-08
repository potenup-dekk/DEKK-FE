import { AnimatePresence } from "framer-motion";
import BackCard from "./BackCard";
import type { UseCardStackResult } from "../model/useCardStack.types";
import CardStackFrontLayer from "./CardStackFrontLayer";

interface CardStackLayersProps {
  cardStack: UseCardStackResult;
  onExitComplete: () => void;
}

const CardStackLayers = ({
  cardStack,
  onExitComplete,
}: CardStackLayersProps) => {
  const { cards, backImage, backScale, removingCardId } = cardStack;
  const hasFrontCard = Boolean(cards[0]);
  const shouldRenderFront = hasFrontCard && !removingCardId;

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        {shouldRenderFront ? (
          <CardStackFrontLayer key={cards[0].id} cardStack={cardStack} />
        ) : null}
      </AnimatePresence>

      {cards.length > 1 ? (
        <BackCard backImage={backImage} backScale={backScale} />
      ) : null}
    </>
  );
};

export default CardStackLayers;
