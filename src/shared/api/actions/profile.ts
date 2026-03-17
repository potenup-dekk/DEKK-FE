"use server";

import { cookies } from "next/headers";
import type { UpdateMyProfilePayload } from "@/entities/user";
import {
  completeOnboarding,
  getMyInfo,
  updateMyProfile,
  type OnboardingPayload,
} from "@/shared/api/services/profile";

const getMyInfoAction = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return getMyInfo(cookieHeader || undefined);
};

const updateMyProfileAction = async (payload: UpdateMyProfilePayload) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return updateMyProfile(payload, cookieHeader || undefined);
};

const completeOnboardingAction = async (payload: OnboardingPayload) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return completeOnboarding(payload, cookieHeader || undefined);
};

export {
  completeOnboardingAction,
  getMyInfoAction,
  updateMyProfileAction,
  type OnboardingPayload,
};
