import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import DeckGridLayer from "./DeckGridLayer";
import DeckOpenLayer from "./DeckOpenLayer";

interface DeckFrameProps {
  decks: DeckItem[];
  activeDeck: DeckItem | null;
  selectedCardId: number | null;
  mode: "closed" | "open" | "hero" | "closing";
  radialOrigin: DeckOriginOffset;
  defaultDeckFetchStatus: DefaultDeckFetchStatus;
  defaultDeckFetchError: string | null;
  onOpenDeck: (deckId: number, sourceRect: DOMRect) => void;
  onRetryLoadDefaultDeck: () => void;
  onCloseDeck: () => void;
  onSelectCard: (cardId: number) => void;
}

const DeckFrame = ({
  decks,
  activeDeck,
  selectedCardId,
  mode,
  radialOrigin,
  defaultDeckFetchStatus,
  defaultDeckFetchError,
  onOpenDeck,
  onRetryLoadDefaultDeck,
  onCloseDeck,
  onSelectCard,
}: DeckFrameProps) => {
  const isOpenLayerVisible = mode !== "closed" && activeDeck;
  const isClosing = mode === "closing";
  const hiddenDeckId = isOpenLayerVisible ? activeDeck.id : null;

  return (
    <>
      <DeckGridLayer
        decks={decks}
        hiddenDeckId={hiddenDeckId}
        onOpenDeck={onOpenDeck}
      />

      {isOpenLayerVisible ? (
        <DeckOpenLayer
          deck={activeDeck}
          selectedCardId={selectedCardId}
          radialOrigin={radialOrigin}
          isClosing={isClosing}
          defaultDeckFetchStatus={defaultDeckFetchStatus}
          defaultDeckFetchError={defaultDeckFetchError}
          onCloseDeck={onCloseDeck}
          onRetryLoadDefaultDeck={onRetryLoadDefaultDeck}
          onSelectCard={onSelectCard}
        />
      ) : null}
    </>
  );
};

export default DeckFrame;
