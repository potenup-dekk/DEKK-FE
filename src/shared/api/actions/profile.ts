"use server";

import { cookies } from "next/headers";
import type { UpdateMyProfilePayload } from "@/entities/user";
import {
  completeOnboarding,
  updateMyProfile,
  type OnboardingPayload,
} from "@/shared/api/services/profile";

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
  updateMyProfileAction,
  type OnboardingPayload,
};
