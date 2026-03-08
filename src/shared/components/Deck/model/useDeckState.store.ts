import { useState, type Dispatch, type SetStateAction } from "react";
import type { DeckOriginOffset } from "./deckState.helpers";
import { createInitialDecks, type DeckItem } from "./deckState.helpers";
import type {
  DefaultDeckFetchStatus,
  DeckViewMode,
} from "./useDeckState.types";
import { DEFAULT_ORIGIN_OFFSET } from "./useDeckState.types";

interface DeckStateStore {
  decks: DeckItem[];
  setDecks: Dispatch<SetStateAction<DeckItem[]>>;
  mode: DeckViewMode;
  setMode: Dispatch<SetStateAction<DeckViewMode>>;
  activeDeckId: number | null;
  setActiveDeckId: Dispatch<SetStateAction<number | null>>;
  selectedCardId: number | null;
  setSelectedCardId: Dispatch<SetStateAction<number | null>>;
  radialOrigin: DeckOriginOffset;
  setRadialOrigin: Dispatch<SetStateAction<DeckOriginOffset>>;
  isCreateSheetOpen: boolean;
  setIsCreateSheetOpen: Dispatch<SetStateAction<boolean>>;
  isHeroFlipped: boolean;
  setIsHeroFlipped: Dispatch<SetStateAction<boolean>>;
  defaultDeckFetchStatus: DefaultDeckFetchStatus;
  setDefaultDeckFetchStatus: Dispatch<SetStateAction<DefaultDeckFetchStatus>>;
  defaultDeckFetchError: string | null;
  setDefaultDeckFetchError: Dispatch<SetStateAction<string | null>>;
  hasLoadedDefaultDeckCards: boolean;
  setHasLoadedDefaultDeckCards: Dispatch<SetStateAction<boolean>>;
}

const useDeckStateStore = (): DeckStateStore => {
  const [decks, setDecks] = useState<DeckItem[]>(() => createInitialDecks());
  const [mode, setMode] = useState<DeckViewMode>("closed");
  const [activeDeckId, setActiveDeckId] = useState<number | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [radialOrigin, setRadialOrigin] = useState<DeckOriginOffset>(
    DEFAULT_ORIGIN_OFFSET,
  );
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [isHeroFlipped, setIsHeroFlipped] = useState(false);
  const [defaultDeckFetchStatus, setDefaultDeckFetchStatus] =
    useState<DefaultDeckFetchStatus>("idle");
  const [defaultDeckFetchError, setDefaultDeckFetchError] = useState<
    string | null
  >(null);
  const [hasLoadedDefaultDeckCards, setHasLoadedDefaultDeckCards] =
    useState(false);

  return {
    decks,
    setDecks,
    mode,
    setMode,
    activeDeckId,
    setActiveDeckId,
    selectedCardId,
    setSelectedCardId,
    radialOrigin,
    setRadialOrigin,
    isCreateSheetOpen,
    setIsCreateSheetOpen,
    isHeroFlipped,
    setIsHeroFlipped,
    defaultDeckFetchStatus,
    setDefaultDeckFetchStatus,
    defaultDeckFetchError,
    setDefaultDeckFetchError,
    hasLoadedDefaultDeckCards,
    setHasLoadedDefaultDeckCards,
  };
};

export default useDeckStateStore;
