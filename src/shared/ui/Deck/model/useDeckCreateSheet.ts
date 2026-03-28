/* eslint-disable max-lines, max-lines-per-function */

import { useCallback, useEffect, useState } from "react";
import type { CustomDeckData } from "@/entities/deck";
import {
  createCustomDeckAction,
  saveCardToCustomDeckAction,
} from "@/shared/api/actions";
import { getCustomDecks } from "@/shared/api/services";

interface UseDeckCreateSheetParams {
  isOpen: boolean;
  targetCardId?: number | null;
  onClose: () => void;
  onSaved?: () => void;
}

const useDeckCreateSheet = ({
  isOpen,
  targetCardId = null,
  onClose,
  onSaved,
}: UseDeckCreateSheetParams) => {
  const [name, setName] = useState("");
  const [customDecks, setCustomDecks] = useState<CustomDeckData[]>([]);
  const [isDecksLoading, setIsDecksLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetMessages = useCallback(() => {
    setStatusMessage(null);
    setErrorMessage(null);
  }, []);

  const resetAndClose = useCallback(() => {
    resetMessages();
    setName("");
    onClose();
  }, [onClose, resetMessages]);

  const loadCustomDecks = useCallback(async () => {
    setIsDecksLoading(true);
    resetMessages();

    try {
      const response = await getCustomDecks();
      setCustomDecks(response.data ?? []);
    } catch {
      setErrorMessage("커스텀 덱 목록을 불러오지 못했습니다.");
    } finally {
      setIsDecksLoading(false);
    }
  }, [resetMessages]);

  useEffect(() => {
    if (!isOpen) return;

    void loadCustomDecks();
  }, [isOpen, loadCustomDecks]);

  const saveToCustomDeck = useCallback(
    async (deckId: number) => {
      if (!targetCardId) {
        setErrorMessage("저장할 카드를 찾지 못했습니다.");
        return false;
      }

      setIsSaving(true);
      resetMessages();

      try {
        await saveCardToCustomDeckAction(deckId, targetCardId);
        setStatusMessage("커스텀 덱에 저장했습니다.");
        onSaved?.();
        resetAndClose();
        return true;
      } catch {
        setErrorMessage("커스텀 덱 저장에 실패했습니다.");
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [onSaved, resetAndClose, resetMessages, targetCardId],
  );

  const createAndSave = useCallback(async () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    if (!targetCardId) {
      setErrorMessage("저장할 카드를 찾지 못했습니다.");
      return;
    }

    setIsCreating(true);
    resetMessages();

    try {
      await createCustomDeckAction(trimmedName);
      const refreshed = await getCustomDecks();
      const latestDeck = [...(refreshed.data ?? [])]
        .filter((deck) => deck.name === trimmedName)
        .sort((left, right) => right.deckId - left.deckId)[0];

      if (!latestDeck) {
        setErrorMessage("생성된 커스텀 덱을 찾지 못했습니다.");
        return;
      }

      setCustomDecks(refreshed.data ?? []);
      setName("");
      await saveToCustomDeck(latestDeck.deckId);
    } catch {
      setErrorMessage("커스텀 덱 생성에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  }, [name, resetMessages, saveToCustomDeck, targetCardId]);

  return {
    name,
    setName,
    customDecks,
    isDecksLoading,
    isSaving,
    isCreating,
    statusMessage,
    errorMessage,
    isCreateDisabled: !name.trim(),
    resetAndClose,
    saveToCustomDeck,
    createAndSave,
  };
};

export default useDeckCreateSheet;
