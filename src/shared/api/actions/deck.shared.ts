"use server";

import { cookies } from "next/headers";
import {
  joinSharedDeck,
  leaveSharedDeck,
  turnOffSharedDeck,
  turnOnSharedDeck,
} from "@/shared/api/services";

const turnOnSharedDeckAction = async (customDeckId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return turnOnSharedDeck(customDeckId, cookieHeader || undefined);
};

const turnOffSharedDeckAction = async (customDeckId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return turnOffSharedDeck(customDeckId, cookieHeader || undefined);
};

const joinSharedDeckAction = async (token: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return joinSharedDeck({ token }, cookieHeader || undefined);
};

const leaveSharedDeckAction = async (sharedDeckId: number) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return leaveSharedDeck(sharedDeckId, cookieHeader || undefined);
};

export {
  joinSharedDeckAction,
  leaveSharedDeckAction,
  turnOffSharedDeckAction,
  turnOnSharedDeckAction,
};
