import { useEffect, useRef, useState } from "react";
import { Clipboard, Pencil, UserPlus, UsersRound, X } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { DeckItem, DeckOriginOffset } from "../model/deckState.helpers";
import type { DefaultDeckFetchStatus } from "../model/useDeckState.types";
import type { CustomDeckShareData } from "@/entities/deck";
import deckStyle from "../style";
import DeckBottomSheet from "./DeckBottomSheet";
import DeckCardList from "./DeckCardList";
import DeckShareNoticeNumberBadge from "./DeckShareNoticeNumberBadge";
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
  onLeaveSharedDeck: () => Promise<boolean>;
  onStopShareDeck: () => Promise<boolean>;
}

interface DeckOpenHeaderProps {
  deckName: string;
  cardCount: number;
  isGuestSharedDeck: boolean;
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
const COPY_TOOLTIP_DURATION_MS = 1500;

interface ShareOnboardingNoticeItem {
  order: number;
  message: string;
}

const SHARE_ONBOARDING_NOTICE_ITEMS: ShareOnboardingNoticeItem[] = [
  {
    order: 1,
    message:
      "덱을 공유하면 공유받은 사람과 덱에 카드를 추가, 삭제할 수 있습니다.",
  },
  {
    order: 2,
    message: "덱 공유를 중단하면 공유받던 사용자는 덱이 사라집니다.",
  },
  {
    order: 3,
    message: "공유된 덱 주소는 24시간 동안만 유지 됩니다.",
  },
];

const DeckOpenHeader = ({
  deckName,
  cardCount,
  isGuestSharedDeck,
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
            aria-label={isGuestSharedDeck ? "공유 덱 나가기" : "덱 공유"}
            onClick={onOpenShareSheet}
          >
            {isGuestSharedDeck ? (
              <UsersRound
                size={HEADER_ACTION_ICON_SIZE}
                strokeWidth={HEADER_ACTION_ICON_STROKE}
              />
            ) : (
              <UserPlus
                size={HEADER_ACTION_ICON_SIZE}
                strokeWidth={HEADER_ACTION_ICON_STROKE}
              />
            )}
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
      aria-label="공유 덱 토글"
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
  onLeaveSharedDeck,
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
    sheetShareInfoStack,
    sheetDeckItem,
    sheetDeckMeta,
    sheetDeckName,
    sheetButton,
    sheetButtonPrimary,
    sheetInput,
    sheetErrorText,
    sheetShareAddressContainer,
    sheetShareAddressRow,
    sheetShareCopyButton,
    sheetShareCopyIcon,
    sheetShareCopyTooltip,
    sheetOnboardingItem,
    sheetOnboardingList,
    sheetOnboardingMessage,
  } = deckStyle();
  const previousSelectedCardIdRef = useRef<number | null>(null);
  const copyTooltipTimeoutRef = useRef<number | null>(null);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isManagePending, setIsManagePending] = useState(false);
  const [isSharePending, setIsSharePending] = useState(false);
  const [isShareOnboardingConfirmed, setIsShareOnboardingConfirmed] =
    useState(false);
  const [shouldStaggerCards, setShouldStaggerCards] = useState(true);
  const [nextDeckName, setNextDeckName] = useState(deck.name);
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  const [shareData, setShareData] = useState<CustomDeckShareData | null>(null);
  const [remainingShareSeconds, setRemainingShareSeconds] = useState<
    number | null
  >(null);
  const [isCopyTooltipVisible, setIsCopyTooltipVisible] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const isGuestSharedDeck = deck.sharedRole === "GUEST";

  const toSecondsFromRemainingTime = (remainingTime: string | null) => {
    if (!remainingTime) {
      return null;
    }

    const parts = remainingTime.split(":").map((part) => Number(part));

    if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
      return null;
    }

    const [hours, minutes, seconds] = parts;

    return hours * 3600 + minutes * 60 + seconds;
  };

  const toRemainingTimeText = (
    seconds: number | null,
    data: CustomDeckShareData | null,
  ) => {
    if (typeof seconds === "number") {
      const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const ss = String(seconds % 60).padStart(2, "0");

      return `${hh}:${mm}:${ss}`;
    }

    if (!data) {
      return "";
    }

    if (data.remainingTime) {
      return data.remainingTime;
    }

    if (data.expiredAt) {
      return data.expiredAt;
    }

    return "정보 없음";
  };

  const getShareUrl = (token: string) => {
    if (!token) {
      return "";
    }

    if (typeof window === "undefined") {
      return `/deck/${token}`;
    }

    return `${window.location.origin}/deck/${token}`;
  };

  useEffect(() => {
    previousSelectedCardIdRef.current = selectedCardId;
  }, [selectedCardId]);

  useEffect(() => {
    return () => {
      if (copyTooltipTimeoutRef.current) {
        window.clearTimeout(copyTooltipTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setNextDeckName(deck.name);
  }, [deck.name]);

  useEffect(() => {
    setShouldStaggerCards(false);
  }, []);

  useEffect(() => {
    const isInitiallyShared =
      deck.type === "SHARED" || Boolean(deck.sharedToken);

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
        expiredInSeconds: deck.sharedExpiredInSeconds,
        expiredAt: null,
        remainingTime: null,
      };
    });
  }, [deck.id, deck.sharedExpiredInSeconds, deck.sharedToken, deck.type]);

  useEffect(() => {
    if (!isShareEnabled) {
      setRemainingShareSeconds(null);
      return;
    }

    if (typeof shareData?.expiredInSeconds === "number") {
      setRemainingShareSeconds(shareData.expiredInSeconds);
      return;
    }

    setRemainingShareSeconds(
      toSecondsFromRemainingTime(shareData?.remainingTime ?? null),
    );
  }, [isShareEnabled, shareData?.expiredInSeconds, shareData?.remainingTime]);

  useEffect(() => {
    if (
      !isShareEnabled ||
      typeof remainingShareSeconds !== "number" ||
      remainingShareSeconds <= 0
    ) {
      return;
    }

    const timerId = window.setInterval(() => {
      setRemainingShareSeconds((previous) => {
        if (typeof previous !== "number") {
          return previous;
        }

        return Math.max(previous - 1, 0);
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isShareEnabled, remainingShareSeconds]);

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

    setIsCopyTooltipVisible(false);
    setIsShareSheetOpen(false);
  };

  const openShareSheet = () => {
    if (deck.isDefault) {
      return;
    }

    setShareError(null);
    setIsShareOnboardingConfirmed(false);
    setIsCopyTooltipVisible(false);
    setIsShareSheetOpen(true);
  };

  const shouldShowShareOnboarding =
    !isGuestSharedDeck && deck.type !== "SHARED" && !isShareEnabled;

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
        setShareError("공유 덱 링크를 생성하지 못했습니다.");
        return;
      }

      setShareData(nextShareData);
      return;
    }

    setIsShareEnabled(false);
    setShareData(null);
    setRemainingShareSeconds(null);
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
    setIsCopyTooltipVisible(true);

    if (copyTooltipTimeoutRef.current) {
      window.clearTimeout(copyTooltipTimeoutRef.current);
    }

    copyTooltipTimeoutRef.current = window.setTimeout(() => {
      setIsCopyTooltipVisible(false);
      copyTooltipTimeoutRef.current = null;
    }, COPY_TOOLTIP_DURATION_MS);
  };

  const handleLeaveSharedDeck = async () => {
    if (isSharePending) {
      return;
    }

    setShareError(null);
    setIsSharePending(true);
    const didLeave = await onLeaveSharedDeck();
    setIsSharePending(false);

    if (!didLeave) {
      setShareError("공유 덱 나가기에 실패했습니다.");
      return;
    }

    setIsShareSheetOpen(false);
    onCloseDeck();
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
          isGuestSharedDeck={isGuestSharedDeck}
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
        title={isGuestSharedDeck ? "공유 덱 나가기" : "공유 덱"}
        description={
          isGuestSharedDeck
            ? "정말 공유 덱에서 퇴장하시겠습니까?"
            : shouldShowShareOnboarding && !isShareOnboardingConfirmed
              ? "덱 공유 전 아래 주의사항을 확인해 주세요."
              : "토글을 켜면 공유가 시작되고, 끄면 공유가 중단됩니다."
        }
        closeAriaLabel="공유 덱 시트 닫기"
        onClose={closeShareSheet}
      >
        {isGuestSharedDeck ? null : shouldShowShareOnboarding &&
          !isShareOnboardingConfirmed ? (
          <>
            <ul className={sheetOnboardingList()}>
              {SHARE_ONBOARDING_NOTICE_ITEMS.map((notice) => {
                return (
                  <li key={notice.order} className={sheetOnboardingItem()}>
                    <DeckShareNoticeNumberBadge value={notice.order} />
                    <p className={sheetOnboardingMessage()}>{notice.message}</p>
                  </li>
                );
              })}
            </ul>

            <div className={sheetActionRowBetween()}>
              <button
                type="button"
                className={clsx(sheetButtonPrimary(), "w-full justify-center")}
                onClick={() => {
                  setIsShareOnboardingConfirmed(true);
                }}
              >
                확인
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={sheetShareInfoStack()}>
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
                    {isShareEnabled
                      ? toRemainingTimeText(remainingShareSeconds, shareData)
                      : "공유 꺼짐"}
                  </p>
                </div>
              </div>

              <div className={sheetDeckItem()}>
                <div className={sheetShareAddressContainer()}>
                  <div className={sheetShareAddressRow()}>
                    <div className="min-w-0 flex-1">
                      <p className={sheetDeckName()}>공유 주소</p>
                      <p className={`${sheetDeckMeta()} truncate`}>
                        {isShareEnabled && shareData?.token
                          ? getShareUrl(shareData.token)
                          : "정보 없음"}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={sheetShareCopyButton()}
                      onClick={() => {
                        void handleCopyShareUrl();
                      }}
                      disabled={
                        !isShareEnabled || !shareData?.token || isSharePending
                      }
                      aria-label="공유 주소 복사"
                    >
                      <Clipboard className={sheetShareCopyIcon()} />
                      {isCopyTooltipVisible ? (
                        <span className={sheetShareCopyTooltip()}>
                          복사 완료
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {shareError ? <p className={sheetErrorText()}>{shareError}</p> : null}

        {isGuestSharedDeck ? (
          <div className={sheetActionRowBetween()}>
            <>
              <button
                type="button"
                className={clsx(sheetButton(), "flex-1 justify-center")}
                onClick={closeShareSheet}
                disabled={isSharePending}
              >
                취소
              </button>
              <button
                type="button"
                className={clsx(sheetDangerButton(), "flex-1 justify-center")}
                onClick={() => {
                  void handleLeaveSharedDeck();
                }}
                disabled={isSharePending}
              >
                나가기
              </button>
            </>
          </div>
        ) : null}
      </DeckBottomSheet>
    </motion.section>
  );
};

export default DeckOpenLayer;
