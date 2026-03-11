"use server";

import { cookies } from "next/headers";
import { deleteDefaultDeckCard } from "@/shared/api/services/deck";

const deleteDefaultDeckCardAction = async (cardId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return deleteDefaultDeckCard(cardId, cookieHeader || undefined);
};

export { deleteDefaultDeckCardAction };
