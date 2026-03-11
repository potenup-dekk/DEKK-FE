import type {
  DeckCardItem,
  DeckOriginOffset,
} from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCard from "./DeckCard";

interface DeckCardListProps {
  cards: DeckCardItem[];
  hiddenCardId: number | null;
  radialOrigin: DeckOriginOffset;
  isClosing: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
  onSelectCard: (cardId: number) => void;
}

const DeckCardList = ({
  cards,
  hiddenCardId,
  radialOrigin,
  isClosing,
  isLoading,
  errorMessage,
  onRetry,
  onSelectCard,
}: DeckCardListProps) => {
  const { cardButton, cardGrid, emptyMessage, statusRetryButton } = deckStyle();

  if (isLoading) {
    return <div className={emptyMessage()}>카드를 불러오는 중입니다.</div>;
  }

  if (errorMessage) {
    return (
      <div className={emptyMessage()}>
        <p>{errorMessage}</p>
        <button type="button" className={statusRetryButton()} onClick={onRetry}>
          다시 시도
        </button>
      </div>
    );
  }

  if (!cards.length) {
    return <div className={emptyMessage()}>아직 카드가 없습니다.</div>;
  }

  return (
    <div className={cardGrid()}>
      {cards.map((card, index) => {
        if (card.id === hiddenCardId) {
          return (
            <div key={card.id} className="w-full" aria-hidden>
              <div className={`${cardButton()} opacity-0`} />
            </div>
          );
        }

        return (
          <DeckCard
            key={card.id}
            card={card}
            index={index}
            radialOrigin={radialOrigin}
            isClosing={isClosing}
            onSelect={onSelectCard}
          />
        );
      })}
    </div>
  );
};

export default DeckCardList;
