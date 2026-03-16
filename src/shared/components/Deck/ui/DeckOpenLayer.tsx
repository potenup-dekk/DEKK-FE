import { useEffect, useRef, useState } from "react";
import { Pencil, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { ShareTokenResult } from "@/entities/deck";
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
  onTurnOnSharedDeck: (
    customDeckId: number,
  ) => Promise<{ success: boolean; tokenResult?: ShareTokenResult }>;
  onTurnOffSharedDeck: (customDeckId: number) => Promise<boolean>;
  onLeaveSharedDeck: (sharedDeckId: number) => Promise<boolean>;
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
  onTurnOnSharedDeck,
  onTurnOffSharedDeck,
  onLeaveSharedDeck,
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
  const [shareToken, setShareToken] = useState<string | null>(null);

  const isSharedDeck = deck.type === "SHARED";
  const isCustomDeck = deck.type === "CUSTOM";

  useEffect(() => {
    previousSelectedCardIdRef.current = selectedCardId;
  }, [selectedCardId]);

  useEffect(() => {
    setNextDeckName(deck.name);
    setShareToken(null);
  }, [deck.name]);

  useEffect(() => {
    setShouldStaggerCards(false);
  }, []);

  const openManageSheet = () => {
    setNextDeckName(deck.name);
    setShareToken(null);
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

  const copyTokenToClipboard = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success("초대 토큰을 복사했습니다.");
      return true;
    } catch {
      toast.error("초대 토큰 복사에 실패했습니다.");
      return false;
    }
  };

  const handleTurnOnSharedDeck = async () => {
    if (isManagePending || !isCustomDeck) {
      return;
    }

    setIsManagePending(true);
    const result = await onTurnOnSharedDeck(deck.id);
    setIsManagePending(false);

    if (!result.success || !result.tokenResult?.token) {
      toast.error("공유 켜기에 실패했습니다.");
      return;
    }

    setShareToken(result.tokenResult.token);
    toast.success("공유를 켰습니다.");
    await copyTokenToClipboard(result.tokenResult.token);
  };

  const handleTurnOffSharedDeck = async () => {
    if (isManagePending || !isSharedDeck) {
      return;
    }

    setIsManagePending(true);
    const didTurnOff = await onTurnOffSharedDeck(deck.id);
    setIsManagePending(false);

    if (!didTurnOff) {
      toast.error("공유 끄기에 실패했습니다.");
      return;
    }

    toast.success("공유를 껐습니다.");
    setIsManageSheetOpen(false);
  };

  const handleLeaveSharedDeck = async () => {
    if (isManagePending || !isSharedDeck) {
      return;
    }

    setIsManagePending(true);
    const didLeave = await onLeaveSharedDeck(deck.id);
    setIsManagePending(false);

    if (!didLeave) {
      toast.error("보관함 나가기에 실패했습니다.");
      return;
    }

    toast.success("보관함에서 나갔습니다.");
    setIsManageSheetOpen(false);
    onCloseDeck();
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
          canManageDeck={!deck.isDefault}
          onOpenManageSheet={openManageSheet}
          onCloseDeck={onCloseDeck}
        />

        <DeckCardList
          cards={deck.cards}
          hiddenCardId={selectedCardId}
          radialOrigin={radialOrigin}
          isClosing={isClosing}
          shouldStagger={shouldStaggerCards}
          isLoading={deck.isDefault && defaultDeckFetchStatus === "loading"}
          errorMessage={deck.isDefault ? defaultDeckFetchError : null}
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
            disabled={deck.isDefault || isManagePending || isSharedDeck}
          >
            삭제
          </button>
          <button
            type="button"
            className={sheetButtonPrimary()}
            onClick={() => {
              void handleRenameDeck();
            }}
            disabled={isManagePending || isSharedDeck}
          >
            제목 수정
          </button>
        </div>

        {isCustomDeck ? (
          <div className={sheetActionRow()}>
            <button
              type="button"
              className={sheetButtonPrimary()}
              onClick={() => {
                void handleTurnOnSharedDeck();
              }}
              disabled={isManagePending}
            >
              공유 켜기
            </button>
          </div>
        ) : null}

        {isSharedDeck ? (
          <>
            {shareToken ? (
              <p className={sheetStatusText()}>{`초대 토큰: ${shareToken}`}</p>
            ) : null}

            <div className={sheetActionRowBetween()}>
              <button
                type="button"
                className={sheetButton()}
                onClick={() => {
                  if (!shareToken) {
                    return;
                  }

                  void copyTokenToClipboard(shareToken);
                }}
                disabled={isManagePending || !shareToken}
              >
                초대 토큰 복사
              </button>
              <button
                type="button"
                className={sheetButtonPrimary()}
                onClick={() => {
                  void handleTurnOffSharedDeck();
                }}
                disabled={isManagePending}
              >
                공유 끄기
              </button>
            </div>

            <div className={sheetActionRow()}>
              <button
                type="button"
                className={sheetDangerButton()}
                onClick={() => {
                  void handleLeaveSharedDeck();
                }}
                disabled={isManagePending}
              >
                보관함 나가기
              </button>
            </div>
          </>
        ) : null}
      </DeckBottomSheet>
    </motion.section>
  );
};

export default DeckOpenLayer;
