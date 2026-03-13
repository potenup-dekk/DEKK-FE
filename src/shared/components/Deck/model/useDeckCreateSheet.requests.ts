import { createCustomDeckAction, saveCardToCustomDeckAction } from "@/shared/api/actions";
import { getCustomDecks } from "@/shared/api/services";
import type { CustomDeckData } from "@/entities/deck";
import type { Dispatch, SetStateAction } from "react";

interface ResetFn {
  (): void;
}

const requestCustomDecks = async (
  resetMessages: ResetFn,
  setIsDecksLoading: (value: boolean) => void,
  setCustomDecks: Dispatch<SetStateAction<CustomDeckData[]>>,
  setErrorMessage: (message: string) => void,
) => {
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
};

const requestSaveCardToDeck = async (
  deckId: number,
  targetCardId: number,
  resetMessages: ResetFn,
  setIsSaving: (value: boolean) => void,
  setStatusMessage: (message: string) => void,
  setErrorMessage: (message: string) => void,
) => {
  setIsSaving(true);
  resetMessages();

  try {
    await saveCardToCustomDeckAction(deckId, targetCardId);
    setStatusMessage("커스텀 덱에 저장했습니다.");
    return true;
  } catch {
    setErrorMessage("커스텀 덱 저장에 실패했습니다.");
    return false;
  } finally {
    setIsSaving(false);
  }
};

const requestCreateAndSave = async (
  name: string,
  targetCardId: number,
  setCustomDecks: Dispatch<SetStateAction<CustomDeckData[]>>,
  setName: (name: string) => void,
  setErrorMessage: (message: string) => void,
  saveToCustomDeck: (deckId: number) => Promise<boolean>,
) => {
  await createCustomDeckAction(name);

  const refreshed = await getCustomDecks();
  const latestDeck = [...(refreshed.data ?? [])]
    .filter((deck) => deck.name === name)
    .sort((left, right) => right.deckId - left.deckId)[0];

  if (!latestDeck) {
    setErrorMessage("생성된 커스텀 덱을 찾지 못했습니다.");
    return;
  }

  setCustomDecks(refreshed.data ?? []);
  setName("");
  await saveToCustomDeck(latestDeck.deckId);
};

export { requestCreateAndSave, requestCustomDecks, requestSaveCardToDeck };
