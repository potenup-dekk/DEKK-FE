import { useEffect, useRef, useState } from "react";
import { Pencil, X } from "lucide-react";
import { motion } from "framer-motion";
import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import deckStyle from "../style";
import DeckBottomSheet from "./DeckBottomSheet";
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
  onUpdateDeckName: (name: string) => Promise<boolean>;
  onDeleteDeck: () => Promise<boolean>;
}

interface DeckOpenHeaderProps {
  deckName: string;
  cardCount: number;
  canManageDeck: boolean;
  onOpenManageSheet: () => void;
  onCloseDeck: () => void;
}

const HEADER_ACTION_ICON_SIZE = 18;
const HEADER_ACTION_ICON_STROKE = 2;

const DeckOpenHeader = ({
  deckName,
  cardCount,
  canManageDeck,
  onOpenManageSheet,
  onCloseDeck,
}: DeckOpenHeaderProps) => {
  const {
    closeButton,
    openDescription,
    openEditButton,
    openHeaderActions,
    openHeader,
    openTitle,
  } = deckStyle();

  return (
    <header className={openHeader()}>
      <div>
        <h2 className={openTitle()}>{deckName}</h2>
        <p className={openDescription()}>{`${cardCount}장의 카드`}</p>
      </div>

      <div className={openHeaderActions()}>
        {canManageDeck ? (
          <button
            type="button"
            className={openEditButton()}
            aria-label="덱 수정"
            onClick={onOpenManageSheet}
          >
            <Pencil
              size={HEADER_ACTION_ICON_SIZE}
              strokeWidth={HEADER_ACTION_ICON_STROKE}
            />
          </button>
        ) : null}
        <button type="button" className={closeButton()} onClick={onCloseDeck}>
          <X
            size={HEADER_ACTION_ICON_SIZE}
            strokeWidth={HEADER_ACTION_ICON_STROKE}
          />
        </button>
      </div>
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
  onUpdateDeckName,
  onDeleteDeck,
}: DeckOpenLayerProps) => {
  const {
    openContent,
    openLayer,
    sheetActionRowBetween,
    sheetDangerButton,
    sheetButtonPrimary,
    sheetInput,
  } = deckStyle();
  const previousSelectedCardIdRef = useRef<number | null>(null);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [isManagePending, setIsManagePending] = useState(false);
  const [shouldStaggerCards, setShouldStaggerCards] = useState(true);
  const [nextDeckName, setNextDeckName] = useState(deck.name);

  useEffect(() => {
    previousSelectedCardIdRef.current = selectedCardId;
  }, [selectedCardId]);

  useEffect(() => {
    setNextDeckName(deck.name);
  }, [deck.name]);

  useEffect(() => {
    setShouldStaggerCards(false);
  }, []);

  const openManageSheet = () => {
    setNextDeckName(deck.name);
    setIsManageSheetOpen(true);
  };

  const closeManageSheet = () => {
    setIsManageSheetOpen(false);
  };

  const handleRenameDeck = async () => {
    if (isManagePending) {
      return;
    }

    setIsManagePending(true);
    const didUpdate = await onUpdateDeckName(nextDeckName);
    setIsManagePending(false);

    if (!didUpdate) {
      return;
    }

    setIsManageSheetOpen(false);
  };

  const handleDeleteDeck = async () => {
    if (isManagePending) {
      return;
    }

    setIsManagePending(true);
    const didDelete = await onDeleteDeck();
    setIsManagePending(false);

    if (!didDelete) {
      return;
    }

    setIsManageSheetOpen(false);
  };

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
          canManageDeck={!deck.isSystem}
          onOpenManageSheet={openManageSheet}
          onCloseDeck={onCloseDeck}
        />

        <DeckCardList
          cards={deck.cards}
          hiddenCardId={selectedCardId}
          radialOrigin={radialOrigin}
          isClosing={isClosing}
          shouldStagger={shouldStaggerCards}
          isLoading={deck.isSystem && defaultDeckFetchStatus === "loading"}
          errorMessage={deck.isSystem ? defaultDeckFetchError : null}
          onRetry={onRetryLoadDefaultDeck}
          onSelectCard={onSelectCard}
        />
      </div>

      <DeckBottomSheet
        isOpen={isManageSheetOpen}
        title="덱 관리"
        description="제목을 수정하거나 덱을 삭제할 수 있습니다."
        closeAriaLabel="덱 관리 시트 닫기"
        onClose={closeManageSheet}
      >
        <input
          className={sheetInput()}
          value={nextDeckName}
          onChange={(event) => {
            setNextDeckName(event.currentTarget.value);
          }}
          placeholder="덱 제목을 입력하세요"
        />

        <div className={sheetActionRowBetween()}>
          <button
            type="button"
            className={sheetDangerButton()}
            onClick={() => {
              void handleDeleteDeck();
            }}
            disabled={deck.isSystem || isManagePending}
          >
            삭제
          </button>
          <button
            type="button"
            className={sheetButtonPrimary()}
            onClick={() => {
              void handleRenameDeck();
            }}
            disabled={isManagePending}
          >
            제목 수정
          </button>
        </div>
      </DeckBottomSheet>
    </motion.section>
  );
};

export default DeckOpenLayer;
