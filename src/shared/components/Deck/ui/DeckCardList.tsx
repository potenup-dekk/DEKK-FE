import type {
  DeckCardItem,
  DeckOriginOffset,
} from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCardGrid from "./DeckCardGrid";
import DeckStatusView from "./DeckStatusView";

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
  const { cardButton, emptyMessage, statusRetryButton } = deckStyle();
  const cardButtonClassName = cardButton();
  const shouldShowStatus = isLoading || Boolean(errorMessage);

  if (shouldShowStatus) {
    return (
      <DeckStatusView
        isLoading={isLoading}
        errorMessage={errorMessage}
        onRetry={onRetry}
        emptyMessageClassName={emptyMessage()}
        retryButtonClassName={statusRetryButton()}
      />
    );
  }

  if (!cards.length) {
    return <div className={emptyMessage()}>아직 카드가 없습니다.</div>;
  }

  return (
    <DeckCardGrid
      cards={cards}
      hiddenCardId={hiddenCardId}
      radialOrigin={radialOrigin}
      isClosing={isClosing}
      onSelectCard={onSelectCard}
      cardButtonClassName={cardButtonClassName}
    />
  );
};

export default DeckCardList;
