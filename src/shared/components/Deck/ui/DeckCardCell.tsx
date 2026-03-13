import type {
  DeckCardItem,
  DeckOriginOffset,
} from "../model/deckState.helpers";
import DeckCard from "./DeckCard";

interface DeckCardCellProps {
  card: DeckCardItem;
  hiddenCardId: number | null;
  index: number;
  radialOrigin: DeckOriginOffset;
  isClosing: boolean;
  shouldStagger: boolean;
  onSelectCard: (cardId: number) => void;
  cardButtonClassName: string;
}

const DeckCardCell = ({
  card,
  hiddenCardId,
  index,
  radialOrigin,
  isClosing,
  shouldStagger,
  onSelectCard,
  cardButtonClassName,
}: DeckCardCellProps) => {
  if (card.id === hiddenCardId) {
    return (
      <div className="w-full" aria-hidden>
        <div className={`${cardButtonClassName} opacity-0`} />
      </div>
    );
  }

  return (
    <DeckCard
      card={card}
      index={index}
      radialOrigin={radialOrigin}
      isClosing={isClosing}
      shouldStagger={shouldStagger}
      onSelect={onSelectCard}
    />
  );
};

export default DeckCardCell;
