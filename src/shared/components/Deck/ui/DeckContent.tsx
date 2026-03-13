import DeckCreateSheet from "@/shared/components/Deck/ui/DeckCreateSheet";
import type { UseDeckStateResult } from "../model/useDeckState.types";
import DeckFrame from "./DeckFrame";
import DeckHeroOverlay from "./DeckHeroOverlay";

interface DeckContentProps {
  deckState: UseDeckStateResult;
}

const DeckContent = ({ deckState }: DeckContentProps) => {
  return (
    <>
      <DeckFrame
        decks={deckState.decks}
        activeDeck={deckState.activeDeck}
        selectedCardId={deckState.selectedCard?.id ?? null}
        mode={deckState.mode}
        radialOrigin={deckState.radialOrigin}
        defaultDeckFetchStatus={deckState.defaultDeckFetchStatus}
        defaultDeckFetchError={deckState.defaultDeckFetchError}
        onOpenDeck={deckState.openDeck}
        onRetryLoadDefaultDeck={deckState.retryLoadDefaultDeck}
        onCloseDeck={deckState.closeDeck}
        onSelectCard={deckState.selectCard}
        onUpdateDeckName={deckState.updateActiveDeckName}
        onDeleteDeck={deckState.deleteActiveDeck}
      />

      <DeckHeroOverlay
        selectedCard={deckState.selectedCard}
        isOpen={deckState.mode === "hero"}
        isFlipped={deckState.isHeroFlipped}
        onClose={deckState.closeHero}
        onDeleteCard={() => {
          void deckState.deleteSelectedCard();
        }}
        onFlip={deckState.toggleHeroFlip}
        onOpenCreateDeckSheet={deckState.openCreateSheet}
      />

      <DeckCreateSheet
        isOpen={deckState.isCreateSheetOpen}
        onClose={deckState.closeCreateSheet}
        onCreate={deckState.createDeck}
        onSaveCardToDeck={deckState.saveSelectedCardToCustomDeck}
      />
    </>
  );
};

export default DeckContent;
