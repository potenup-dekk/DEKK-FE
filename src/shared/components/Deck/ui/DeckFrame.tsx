import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import deckStyle from "../style";
import DeckCover from "./DeckCover";
import DeckCardList from "./DeckCardList";

interface DeckFrameProps {
  decks: DeckItem[];
  activeDeck: DeckItem | null;
  mode: "closed" | "open" | "hero" | "closing";
  radialOrigin: DeckOriginOffset;
  defaultDeckFetchStatus: DefaultDeckFetchStatus;
  defaultDeckFetchError: string | null;
  onOpenDeck: (deckId: number, sourceRect: DOMRect) => void;
  onRetryLoadDefaultDeck: () => void;
  onCloseDeck: () => void;
  onSelectCard: (cardId: number) => void;
}

interface DeckGridLayerProps {
  decks: DeckItem[];
  hiddenDeckId: number | null;
  onOpenDeck: (deckId: number, sourceRect: DOMRect) => void;
}

interface OpenDeckLayerProps {
  deck: DeckItem;
  radialOrigin: DeckOriginOffset;
  isClosing: boolean;
  defaultDeckFetchStatus: DefaultDeckFetchStatus;
  defaultDeckFetchError: string | null;
  onCloseDeck: () => void;
  onRetryLoadDefaultDeck: () => void;
  onSelectCard: (cardId: number) => void;
}

const DeckGridLayer = ({ decks, hiddenDeckId, onOpenDeck }: DeckGridLayerProps) => {
  const { deckGrid } = deckStyle();

  return (
    <div className={deckGrid()}>
      {decks.map((deck) => {
        if (deck.id === hiddenDeckId) {
          return null;
        }

        return <DeckCover key={deck.id} deck={deck} onOpen={onOpenDeck} />;
      })}
    </div>
  );
};

const OpenDeckLayer = ({
  deck,
  radialOrigin,
  isClosing,
  defaultDeckFetchStatus,
  defaultDeckFetchError,
  onCloseDeck,
  onRetryLoadDefaultDeck,
  onSelectCard,
}: OpenDeckLayerProps) => {
  const {
    closeButton,
    openContent,
    openDescription,
    openHeader,
    openLayer,
    openTitle,
  } =
    deckStyle();

  return (
    <motion.section
      className={openLayer()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={openContent()}>
        <header className={openHeader()}>
          <div>
            <h2 className={openTitle()}>{deck.name}</h2>
            <p className={openDescription()}>{`${deck.cards.length}개의 카드`}</p>
          </div>
          <button type="button" className={closeButton()} onClick={onCloseDeck}>
            <X size={18} />
          </button>
        </header>

        <DeckCardList
          cards={deck.cards}
          radialOrigin={radialOrigin}
          isClosing={isClosing}
          isLoading={deck.isSystem && defaultDeckFetchStatus === "loading"}
          errorMessage={deck.isSystem ? defaultDeckFetchError : null}
          onRetry={onRetryLoadDefaultDeck}
          onSelectCard={onSelectCard}
        />
      </div>
    </motion.section>
  );
};

const DeckFrame = ({
  decks,
  activeDeck,
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
        <OpenDeckLayer
          deck={activeDeck}
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
