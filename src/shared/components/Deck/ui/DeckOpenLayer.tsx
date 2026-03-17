import { useEffect, useRef, useState } from "react";
import { Pencil, UserPlus, X } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import type { CustomDeckShareData } from "@/entities/deck";
import deckStyle from "../style";
import DeckBottomSheet from "./DeckBottomSheet";
import DeckCardList from "./DeckCardList";
import DeckSelectionOverlay from "./DeckSelectionOverlay";

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
  onShareDeck: () => Promise<CustomDeckShareData | null>;
  onStopShareDeck: () => Promise<boolean>;
}

interface DeckOpenHeaderProps {
  deckName: string;
  cardCount: number;
  canManageDeck: boolean;
  canShareDeck: boolean;
  onOpenShareSheet: () => void;
  onOpenManageSheet: () => void;
  onCloseDeck: () => void;
}

interface DeckShareToggleProps {
  isOn: boolean;
  isPending: boolean;
  onToggle: () => void;
}

const HEADER_ACTION_ICON_SIZE = 18;
const HEADER_ACTION_ICON_STROKE = 2;

const DeckOpenHeader = ({
  deckName,
  cardCount,
  canManageDeck,
  canShareDeck,
  onOpenShareSheet,
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
        {canShareDeck ? (
          <button
            type="button"
            className={closeButton()}
            aria-label="쉐어덱 공유"
            onClick={onOpenShareSheet}
          >
            <UserPlus
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

const DeckShareToggle = ({
  isOn,
  isPending,
  onToggle,
}: DeckShareToggleProps) => {
  const {
    sheetToggleButton,
    sheetToggleButtonOff,
    sheetToggleButtonOn,
    sheetToggleThumb,
    sheetToggleThumbOff,
    sheetToggleThumbOn,
  } = deckStyle();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label="쉐어덱 공유 토글"
      className={clsx(
        sheetToggleButton(),
        isOn ? sheetToggleButtonOn() : sheetToggleButtonOff(),
      )}
      onClick={onToggle}
      disabled={isPending}
    >
      <span
        className={clsx(
          sheetToggleThumb(),
          isOn ? sheetToggleThumbOn() : sheetToggleThumbOff(),
        )}
      />
    </button>
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
  onShareDeck,
  onStopShareDeck,
}: DeckOpenLayerProps) => {
  const {
    openContent,
    openLayer,
    selectionOverlayTint,
    sheetActionRowBetween,
    sheetDangerButton,
    sheetToggleLabel,
    sheetToggleRow,
    sheetDeckItem,
    sheetDeckMeta,
    sheetDeckName,
    sheetButton,
    sheetButtonPrimary,
    sheetInput,
    sheetErrorText,
  } = deckStyle();
  const previousSelectedCardIdRef = useRef<number | null>(null);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isManagePending, setIsManagePending] = useState(false);
  const [isSharePending, setIsSharePending] = useState(false);
  const [shouldStaggerCards, setShouldStaggerCards] = useState(true);
  const [nextDeckName, setNextDeckName] = useState(deck.name);
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  const [shareData, setShareData] = useState<CustomDeckShareData | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);

  const getShareUrl = (token: string) => {
    if (!token) {
      return "";
    }

    if (typeof window === "undefined") {
      return `/deck/${token}`;
    }

    return `${window.location.origin}/deck/${token}`;
  };

  const toRemainingTimeText = (data: CustomDeckShareData | null) => {
    if (!data) {
      return "";
    }

    if (data.remainingTime) {
      return data.remainingTime;
    }

    if (typeof data.expiredInSeconds === "number") {
      const hours = Math.floor(data.expiredInSeconds / 3600);
      const minutes = Math.floor((data.expiredInSeconds % 3600) / 60);
      const seconds = data.expiredInSeconds % 60;

      const hh = String(hours).padStart(2, "0");
      const mm = String(minutes).padStart(2, "0");
      const ss = String(seconds).padStart(2, "0");

      return `${hh}:${mm}:${ss}`;
    }

    if (data.expiredAt) {
      return data.expiredAt;
    }

    return "정보 없음";
  };

  useEffect(() => {
    previousSelectedCardIdRef.current = selectedCardId;
  }, [selectedCardId]);

  useEffect(() => {
    setNextDeckName(deck.name);
  }, [deck.name]);

  useEffect(() => {
    setShouldStaggerCards(false);
  }, []);

  useEffect(() => {
    const isInitiallyShared = deck.type === "SHARED";

    setIsShareEnabled(isInitiallyShared);
    setShareData((previous) => {
      if (!isInitiallyShared) {
        return null;
      }

      if (previous?.token) {
        return previous;
      }

      return {
        token: deck.sharedToken ?? "",
        expiredInSeconds: null,
        expiredAt: null,
        remainingTime: null,
      };
    });
  }, [deck.id, deck.sharedToken, deck.type]);

  const openManageSheet = () => {
    setNextDeckName(deck.name);
    setIsManageSheetOpen(true);
  };

  const closeManageSheet = () => {
    setIsManageSheetOpen(false);
  };

  const closeShareSheet = () => {
    if (isSharePending) {
      return;
    }

    setIsShareSheetOpen(false);
  };

  const openShareSheet = () => {
    if (deck.isDefault) {
      return;
    }

    setShareError(null);
    setIsShareSheetOpen(true);
  };

  const handleShareToggle = async () => {
    if (isSharePending) {
      return;
    }

    const previousShareEnabled = isShareEnabled;
    const previousShareData = shareData;
    setShareError(null);
    setIsSharePending(true);

    if (!previousShareEnabled) {
      setIsShareEnabled(true);
      const nextShareData = await onShareDeck();
      setIsSharePending(false);

      if (!nextShareData?.token) {
        setIsShareEnabled(previousShareEnabled);
        setShareData(previousShareData);
        setShareError("쉐어덱 공유 링크를 생성하지 못했습니다.");
        return;
      }

      setShareData(nextShareData);
      return;
    }

    setIsShareEnabled(false);
    setShareData(null);
    const didStop = await onStopShareDeck();
    setIsSharePending(false);

    if (!didStop) {
      setIsShareEnabled(previousShareEnabled);
      setShareData(previousShareData);
      setShareError("공유 중단에 실패했습니다.");
      return;
    }
  };

  const handleCopyShareUrl = async () => {
    const token = shareData?.token ?? "";
    const shareUrl = getShareUrl(token);

    if (!shareUrl || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
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
      <DeckSelectionOverlay
        isVisible={Boolean(selectedCardId)}
        tintClassName={selectionOverlayTint()}
      />

      <div className={openContent()}>
        <DeckOpenHeader
          deckName={deck.name}
          cardCount={deck.cardCount}
          canManageDeck={!deck.isDefault}
          canShareDeck={!deck.isDefault}
          onOpenShareSheet={() => {
            openShareSheet();
          }}
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
            disabled={deck.isDefault || isManagePending}
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

      <DeckBottomSheet
        isOpen={isShareSheetOpen}
        title="쉐어덱 공유"
        description="토글을 켜면 공유가 시작되고, 끄면 공유가 중단됩니다."
        closeAriaLabel="쉐어덱 공유 시트 닫기"
        onClose={closeShareSheet}
      >
        <div className={sheetToggleRow()}>
          <p className={sheetToggleLabel()}>공유 상태</p>
          <DeckShareToggle
            isOn={isShareEnabled}
            isPending={isSharePending}
            onToggle={() => {
              void handleShareToggle();
            }}
          />
        </div>

        <div className={sheetDeckItem()}>
          <div>
            <p className={sheetDeckName()}>남은 시간</p>
            <p className={sheetDeckMeta()}>
              {isShareEnabled ? toRemainingTimeText(shareData) : "공유 꺼짐"}
            </p>
          </div>
        </div>

        <div className={sheetDeckItem()}>
          <div className="w-full min-w-0">
            <p className={sheetDeckName()}>공유 주소</p>
            <p className={`${sheetDeckMeta()} truncate`}>
              {isShareEnabled && shareData?.token
                ? getShareUrl(shareData.token)
                : "정보 없음"}
            </p>
          </div>
        </div>

        {shareError ? <p className={sheetErrorText()}>{shareError}</p> : null}

        <div className={sheetActionRowBetween()}>
          <button
            type="button"
            className={sheetButton()}
            onClick={() => {
              void handleCopyShareUrl();
            }}
            disabled={!isShareEnabled || !shareData?.token || isSharePending}
          >
            링크 복사
          </button>
        </div>
      </DeckBottomSheet>
    </motion.section>
  );
};

export default DeckOpenLayer;
