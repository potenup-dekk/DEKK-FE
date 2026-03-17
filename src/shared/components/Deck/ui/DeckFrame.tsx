import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import type { CustomDeckShareData } from "@/entities/deck";
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
  onPrefetchDeckDetail: (deckId: number) => void;
  onRetryLoadDefaultDeck: () => void;
  onCloseDeck: () => void;
  onSelectCard: (cardId: number) => void;
  onUpdateDeckName: (name: string) => Promise<boolean>;
  onDeleteDeck: () => Promise<boolean>;
  onShareDeck: () => Promise<CustomDeckShareData | null>;
  onStopShareDeck: () => Promise<boolean>;
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
  onPrefetchDeckDetail,
  onRetryLoadDefaultDeck,
  onCloseDeck,
  onSelectCard,
  onUpdateDeckName,
  onDeleteDeck,
  onShareDeck,
  onStopShareDeck,
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
        onPrefetchDeckDetail={onPrefetchDeckDetail}
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
          onUpdateDeckName={onUpdateDeckName}
          onDeleteDeck={onDeleteDeck}
          onShareDeck={onShareDeck}
          onStopShareDeck={onStopShareDeck}
        />
      ) : null}
    </>
  );
};

export default DeckFrame;
