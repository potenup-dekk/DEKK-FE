import { AnimatePresence } from "framer-motion";
import BackCard from "./BackCard";
import type { UseCardStackResult } from "../model/useCardStack.types";
import CardStackFrontLayer from "./CardStackFrontLayer";
import type { CardDisplayOptions } from "../model/props.type";

interface CardStackLayersProps {
  cardStack: UseCardStackResult;
  onExitComplete: () => void;
  displayOptions: CardDisplayOptions;
}

const CardStackLayers = ({
  cardStack,
  onExitComplete,
  displayOptions,
}: CardStackLayersProps) => {
  const { cards, backImage, backScale, removingCardId } = cardStack;
  const hasFrontCard = Boolean(cards[0]);
  const shouldRenderFront = hasFrontCard && !removingCardId;
  const shouldApplyCompressedCard =
    displayOptions.isCardCompressed &&
    !displayOptions.isFocusMode &&
    displayOptions.compressedCardHeight !== null;

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        {shouldRenderFront ? (
          <CardStackFrontLayer
            key={cards[0].id}
            cardStack={cardStack}
            displayOptions={displayOptions}
          />
        ) : null}
      </AnimatePresence>

      {cards.length > 1 ? (
        <BackCard
          backImage={backImage}
          backScale={backScale}
          compressedCardHeight={displayOptions.compressedCardHeight}
          expandedCardHeight={displayOptions.expandedCardHeight}
          isCardCompressed={shouldApplyCompressedCard}
        />
      ) : null}
    </>
  );
};

export default CardStackLayers;
