"use server";

import { cookies } from "next/headers";
import {
  createCustomDeck,
  deleteDefaultDeckCard,
  saveCardToCustomDeck,
} from "@/shared/api/services";

const deleteDefaultDeckCardAction = async (cardId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return deleteDefaultDeckCard(cardId, cookieHeader || undefined);
};

const createCustomDeckAction = async (name: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return createCustomDeck({ name }, cookieHeader || undefined);
};

const saveCardToCustomDeckAction = async (customDeckId: number, cardId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return saveCardToCustomDeck(customDeckId, cardId, cookieHeader || undefined);
};

export {
  createCustomDeckAction,
  deleteDefaultDeckCardAction,
  saveCardToCustomDeckAction,
};
