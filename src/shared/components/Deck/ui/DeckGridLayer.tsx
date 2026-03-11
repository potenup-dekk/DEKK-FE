import type { DeckItem } from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCover from "./DeckCover";

interface DeckGridLayerProps {
  decks: DeckItem[];
  hiddenDeckId: number | null;
  onOpenDeck: (deckId: number, sourceRect: DOMRect) => void;
}

const HiddenDeckPlaceholder = () => {
  const { coverMeta, coverStack, coverTitle, emptyCoverStack } = deckStyle();

  return (
    <div
      className="flex w-25 flex-col items-center gap-1 text-center"
      aria-hidden
    >
      <div className={coverStack()}>
        <div className={`${emptyCoverStack()} opacity-0`} />
      </div>
      <div className={`${coverTitle()} opacity-0`}>placeholder</div>
      <div className={`${coverMeta()} opacity-0`}>placeholder</div>
    </div>
  );
};

const DeckGridLayer = ({
  decks,
  hiddenDeckId,
  onOpenDeck,
}: DeckGridLayerProps) => {
  const { deckGrid } = deckStyle();

  return (
    <div className={deckGrid()}>
      {decks.map((deck) => {
        if (deck.id === hiddenDeckId) {
          return <HiddenDeckPlaceholder key={deck.id} />;
        }

        return <DeckCover key={deck.id} deck={deck} onOpen={onOpenDeck} />;
      })}
    </div>
  );
};

export default DeckGridLayer;
