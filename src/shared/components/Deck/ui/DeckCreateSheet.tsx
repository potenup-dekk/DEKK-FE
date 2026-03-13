"use client";

import { useEffect, useState } from "react";
import type { CustomDeckData } from "@/entities/deck";
import { getCustomDecks } from "@/shared/api/services";
import { toast } from "sonner";
import deckStyle from "../style";
import DeckBottomSheet from "./DeckBottomSheet";

interface DeckCreateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<boolean>;
  onSaveCardToDeck: (customDeckId: number) => Promise<boolean>;
}

const DeckCreateSheet = ({
  isOpen,
  onClose,
  onCreate,
  onSaveCardToDeck,
}: DeckCreateSheetProps) => {
  const {
    sheetActionRow,
    sheetButton,
    sheetButtonPrimary,
    sheetDeckItem,
    sheetDeckList,
    sheetDeckMeta,
    sheetDeckName,
    sheetInput,
    sheetSectionTitle,
    sheetStatusText,
  } = deckStyle();
  const [name, setName] = useState("");
  const [customDecks, setCustomDecks] = useState<CustomDeckData[]>([]);
  const [isDeckListLoading, setIsDeckListLoading] = useState(false);
  const [deckListError, setDeckListError] = useState<string | null>(null);
  const [isCreatePending, setIsCreatePending] = useState(false);
  const [isSavePending, setIsSavePending] = useState(false);
  const MAX_DECK_NAME_LENGTH = 20;

  const isSubmitDisabled = !name.trim() || isCreatePending;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isActive = true;

    const loadCustomDeckList = async () => {
      setIsDeckListLoading(true);
      setDeckListError(null);

      try {
        const response = await getCustomDecks();

        if (!isActive) {
          return;
        }

        setCustomDecks(response.data ?? []);
      } catch (error) {
        if (!isActive) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "커스텀 덱 목록을 불러오지 못했습니다.";

        setDeckListError(message);
      } finally {
        if (!isActive) {
          return;
        }

        setIsDeckListLoading(false);
      }
    };

    void loadCustomDeckList();

    return () => {
      isActive = false;
    };
  }, [isOpen]);

  const resetAndClose = () => {
    setName("");
    onClose();
  };

  const findCreatedDeckId = (
    previousDecks: CustomDeckData[],
    nextDecks: CustomDeckData[],
    createdName: string,
  ) => {
    const previousDeckIdSet = new Set(
      previousDecks.map((deck) => {
        return deck.deckId;
      }),
    );

    const appendedDeck = nextDecks.find((deck) => {
      return !previousDeckIdSet.has(deck.deckId);
    });

    if (appendedDeck) {
      return appendedDeck.deckId;
    }

    const matchedDecks = nextDecks
      .filter((deck) => {
        return deck.name.trim() === createdName;
      })
      .sort((left, right) => {
        return right.deckId - left.deckId;
      });

    if (!matchedDecks.length) {
      return null;
    }

    return matchedDecks[0].deckId;
  };

  const handleCreate = async () => {
    if (isCreatePending) {
      return;
    }

    const trimmedName = name.trim();
    const previousDecks = customDecks;

    setIsCreatePending(true);
    const didCreate = await onCreate(trimmedName);
    setIsCreatePending(false);

    if (!didCreate) {
      toast.error("커스텀 덱 생성에 실패했습니다.");
      return;
    }

    let nextDecks: CustomDeckData[] = [];
    try {
      const response = await getCustomDecks();
      nextDecks = response.data ?? [];
      setCustomDecks(nextDecks);
    } catch {
      toast.success("커스텀 덱을 생성했습니다.");
      setName("");
      return;
    }

    const createdDeckId = findCreatedDeckId(
      previousDecks,
      nextDecks,
      trimmedName,
    );

    if (createdDeckId === null) {
      toast.success("커스텀 덱을 생성했습니다.");
      setName("");
      return;
    }

    setIsSavePending(true);
    const didSave = await onSaveCardToDeck(createdDeckId);
    setIsSavePending(false);

    if (!didSave) {
      toast.error("덱은 생성됐지만 카드 저장은 실패했습니다.");
      setName("");
      return;
    }

    toast.success("커스텀 덱 생성과 카드 저장이 완료됐습니다.");
    resetAndClose();
  };

  const handleSaveCardToDeck = async (customDeckId: number) => {
    if (isSavePending) {
      return;
    }

    setIsSavePending(true);
    const didSave = await onSaveCardToDeck(customDeckId);
    setIsSavePending(false);

    if (!didSave) {
      toast.error("카드 저장에 실패했습니다.");
      return;
    }

    toast.success("카드를 커스텀 덱에 저장했습니다.");
    resetAndClose();
  };

  return (
    <DeckBottomSheet
      isOpen={isOpen}
      title="커스텀 덱 만들기"
      description="덱 이름을 입력하면 바로 생성됩니다."
      closeAriaLabel="덱 생성 시트 닫기"
      onClose={resetAndClose}
    >
      <input
        type="text"
        className={sheetInput()}
        value={name}
        maxLength={MAX_DECK_NAME_LENGTH}
        placeholder="예: 봄 데일리"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <div className={sheetActionRow()}>
        <button type="button" className={sheetButton()} onClick={resetAndClose}>
          취소
        </button>
        <button
          type="button"
          className={sheetButtonPrimary()}
          disabled={isSubmitDisabled}
          onClick={() => {
            void handleCreate();
          }}
        >
          {isCreatePending ? "생성 중" : "생성"}
        </button>
      </div>

      <p className={sheetSectionTitle()}>내 커스텀 덱 목록</p>
      {isDeckListLoading ? (
        <p className={sheetStatusText()}>목록을 불러오는 중입니다.</p>
      ) : null}
      {deckListError ? (
        <p className={sheetStatusText()}>{deckListError}</p>
      ) : null}
      {!isDeckListLoading && !deckListError ? (
        <div className={sheetDeckList()}>
          {customDecks.length ? (
            customDecks.map((deck) => {
              return (
                <button
                  key={deck.deckId}
                  type="button"
                  className={sheetDeckItem()}
                  disabled={isSavePending}
                  onClick={() => {
                    void handleSaveCardToDeck(deck.deckId);
                  }}
                >
                  <span className={sheetDeckName()}>{deck.name}</span>
                  <span
                    className={sheetDeckMeta()}
                  >{`${deck.cardCount}장`}</span>
                </button>
              );
            })
          ) : (
            <p className={sheetStatusText()}>커스텀 덱이 아직 없습니다.</p>
          )}
        </div>
      ) : null}
    </DeckBottomSheet>
  );
};

export default DeckCreateSheet;
