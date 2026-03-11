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
  onSelectCard: (cardId: number) => void;
  cardButtonClassName: string;
}

const DeckCardCell = ({
  card,
  hiddenCardId,
  index,
  radialOrigin,
  isClosing,
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
      onSelect={onSelectCard}
    />
  );
};

export default DeckCardCell;
