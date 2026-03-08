"use server";

import type { UpdateMyProfilePayload } from "@/entities/user";
import {
  completeOnboarding,
  updateMyProfile,
  type OnboardingPayload,
} from "@/shared/api/services/profile";

const updateMyProfileAction = async (payload: UpdateMyProfilePayload) => {
  return updateMyProfile(payload);
};

const completeOnboardingAction = async (payload: OnboardingPayload) => {
  return completeOnboarding(payload);
};

export {
  completeOnboardingAction,
  updateMyProfileAction,
  type OnboardingPayload,
};
