import type {
  DeckCardItem,
  DeckOriginOffset,
} from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCardCell from "./DeckCardCell";

interface DeckCardGridProps {
  cards: DeckCardItem[];
  hiddenCardId: number | null;
  radialOrigin: DeckOriginOffset;
  isClosing: boolean;
  shouldStagger: boolean;
  onSelectCard: (cardId: number) => void;
  cardButtonClassName: string;
}

const DeckCardGrid = ({
  cards,
  hiddenCardId,
  radialOrigin,
  isClosing,
  shouldStagger,
  onSelectCard,
  cardButtonClassName,
}: DeckCardGridProps) => {
  const { cardGrid } = deckStyle();

  return (
    <div className={cardGrid()}>
      {cards.map((card, index) => {
        return (
          <DeckCardCell
            key={card.id}
            card={card}
            hiddenCardId={hiddenCardId}
            index={index}
            radialOrigin={radialOrigin}
            isClosing={isClosing}
            shouldStagger={shouldStagger}
            onSelectCard={onSelectCard}
            cardButtonClassName={cardButtonClassName}
          />
        );
      })}
    </div>
  );
};

export default DeckCardGrid;
