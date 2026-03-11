import type { Dispatch, SetStateAction } from "react";
import type { DeckItem, DeckOriginOffset } from "./deckState.helpers";
import type { DeckViewMode } from "./useDeckState.types";

interface DeckStateActionsParams {
  mode: DeckViewMode;
  setMode: Dispatch<SetStateAction<DeckViewMode>>;
  setDecks: Dispatch<SetStateAction<DeckItem[]>>;
  setActiveDeckId: Dispatch<SetStateAction<number | null>>;
  setSelectedCardId: Dispatch<SetStateAction<number | null>>;
  setRadialOrigin: Dispatch<SetStateAction<DeckOriginOffset>>;
  setIsCreateSheetOpen: Dispatch<SetStateAction<boolean>>;
  setIsHeroFlipped: Dispatch<SetStateAction<boolean>>;
  clearCloseTimeout: () => void;
  scheduleCloseReset: () => void;
}

export type { DeckStateActionsParams };
