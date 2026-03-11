import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import deckStyle from "../style";
import DeckCardList from "./DeckCardList";

interface DeckOpenLayerProps {
  deck: DeckItem;
  selectedCardId: number | null;
  radialOrigin: DeckOriginOffset;
  isClosing: boolean;
  defaultDeckFetchStatus: DefaultDeckFetchStatus;
  defaultDeckFetchError: string | null;
  onCloseDeck: () => void;
  onRetryLoadDefaultDeck: () => void;
  onSelectCard: (cardId: number) => void;
}

interface DeckOpenHeaderProps {
  deckName: string;
  cardCount: number;
  onCloseDeck: () => void;
}

const DeckOpenHeader = ({
  deckName,
  cardCount,
  onCloseDeck,
}: DeckOpenHeaderProps) => {
  const { closeButton, openDescription, openHeader, openTitle } = deckStyle();

  return (
    <header className={openHeader()}>
      <div>
        <h2 className={openTitle()}>{deckName}</h2>
        <p className={openDescription()}>{`${cardCount}장의 카드`}</p>
      </div>
      <button type="button" className={closeButton()} onClick={onCloseDeck}>
        <X size={18} />
      </button>
    </header>
  );
};

const DeckOpenLayer = ({
  deck,
  selectedCardId,
  radialOrigin,
  isClosing,
  defaultDeckFetchStatus,
  defaultDeckFetchError,
  onCloseDeck,
  onRetryLoadDefaultDeck,
  onSelectCard,
}: DeckOpenLayerProps) => {
  const { openContent, openLayer } = deckStyle();

  return (
    <motion.section
      className={openLayer()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={openContent()}>
        <DeckOpenHeader
          deckName={deck.name}
          cardCount={deck.cardCount}
          onCloseDeck={onCloseDeck}
        />

        <DeckCardList
          cards={deck.cards}
          hiddenCardId={selectedCardId}
          radialOrigin={radialOrigin}
          isClosing={isClosing}
          isLoading={deck.isDefault && defaultDeckFetchStatus === "loading"}
          errorMessage={deck.isDefault ? defaultDeckFetchError : null}
          onRetry={onRetryLoadDefaultDeck}
          onSelectCard={onSelectCard}
        />
      </div>
    </motion.section>
  );
};

export default DeckOpenLayer;
