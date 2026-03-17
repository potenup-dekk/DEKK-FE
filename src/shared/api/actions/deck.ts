"use server";

import { cookies } from "next/headers";
import {
  createCustomDeck,
  deleteCardFromCustomDeck,
  deleteCustomDeck,
  deleteDefaultDeckCard,
  joinSharedDeck,
  saveCardToCustomDeck,
  shareCustomDeck,
  stopCustomDeckShare,
  updateCustomDeckName,
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

const saveCardToCustomDeckAction = async (
  customDeckId: number,
  cardId: number,
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return saveCardToCustomDeck(customDeckId, cardId, cookieHeader || undefined);
};

const deleteCardFromCustomDeckAction = async (
  customDeckId: number,
  cardId: number,
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return deleteCardFromCustomDeck(
    customDeckId,
    cardId,
    cookieHeader || undefined,
  );
};

const updateCustomDeckNameAction = async (
  customDeckId: number,
  name: string,
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return updateCustomDeckName(
    customDeckId,
    { name },
    cookieHeader || undefined,
  );
};

const deleteCustomDeckAction = async (customDeckId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return deleteCustomDeck(customDeckId, cookieHeader || undefined);
};

const shareCustomDeckAction = async (customDeckId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return shareCustomDeck(customDeckId, cookieHeader || undefined);
};

const stopCustomDeckShareAction = async (customDeckId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return stopCustomDeckShare(customDeckId, cookieHeader || undefined);
};

const joinSharedDeckAction = async (token: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return joinSharedDeck({ token }, cookieHeader || undefined);
};

export {
  createCustomDeckAction,
  deleteCardFromCustomDeckAction,
  deleteCustomDeckAction,
  deleteDefaultDeckCardAction,
  joinSharedDeckAction,
  saveCardToCustomDeckAction,
  shareCustomDeckAction,
  stopCustomDeckShareAction,
  updateCustomDeckNameAction,
};
