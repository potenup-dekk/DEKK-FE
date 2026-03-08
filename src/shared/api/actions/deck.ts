"use server";

import { deleteDefaultDeckCard } from "@/shared/api/services/deck";

const deleteDefaultDeckCardAction = async (cardId: number) => {
  return deleteDefaultDeckCard(cardId);
};

export { deleteDefaultDeckCardAction };
