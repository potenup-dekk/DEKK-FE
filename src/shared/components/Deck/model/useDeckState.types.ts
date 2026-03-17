import type {
  DeckCardItem,
  DeckItem,
  DeckOriginOffset,
} from "./deckState.helpers";
import type { CustomDeckShareData } from "@/entities/deck";

type DeckViewMode = "closed" | "open" | "hero" | "closing";
type DefaultDeckFetchStatus = "idle" | "loading" | "success" | "error";

interface UseDeckStateResult {
  decks: DeckItem[];
  mode: DeckViewMode;
  activeDeck: DeckItem | null;
  selectedCard: DeckCardItem | null;
  radialOrigin: DeckOriginOffset;
  isCreateSheetOpen: boolean;
  isHeroFlipped: boolean;
  defaultDeckFetchStatus: DefaultDeckFetchStatus;
  defaultDeckFetchError: string | null;
  openDeck: (deckId: number, sourceRect: DOMRect) => void;
  prefetchDeckDetail: (deckId: number) => void;
  retryLoadDefaultDeck: () => void;
  closeDeck: () => void;
  selectCard: (cardId: number) => void;
  closeHero: () => void;
  toggleHeroFlip: () => void;
  openCreateSheet: () => void;
  closeCreateSheet: () => void;
  createDeck: (name: string) => Promise<boolean>;
  saveSelectedCardToCustomDeck: (customDeckId: number) => Promise<boolean>;
  deleteSelectedCard: () => Promise<boolean>;
  updateActiveDeckName: (name: string) => Promise<boolean>;
  deleteActiveDeck: () => Promise<boolean>;
  shareActiveDeck: () => Promise<CustomDeckShareData | null>;
  stopShareActiveDeck: () => Promise<boolean>;
}

const DEFAULT_ORIGIN_OFFSET: DeckOriginOffset = { x: 0, y: 0 };
const CLOSE_ANIMATION_DURATION = 260;

export { CLOSE_ANIMATION_DURATION, DEFAULT_ORIGIN_OFFSET };
export type { DeckViewMode, DefaultDeckFetchStatus, UseDeckStateResult };
