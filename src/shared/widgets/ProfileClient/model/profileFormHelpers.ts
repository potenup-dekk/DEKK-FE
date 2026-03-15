import { ApiRequestError } from "@/shared/api/fetcher/client";
import { updateMyProfileAction } from "@/shared/api/actions";
import type { Gender, UpdateMyProfilePayload } from "@/entities/user";

interface ProfileFormValue {
  nickname: string;
  height: string;
  weight: string;
  gender: Gender | "";
}

interface ProfileFormErrors {
  nickname?: string;
  height?: string;
  weight?: string;
  gender?: string;
}

const GENDER_VALUES = ["MALE", "FEMALE", "OTHER"] as const;

const validateForm = (form: ProfileFormValue) => {
  const nextErrors: ProfileFormErrors = {};

  if (!form.nickname.trim()) nextErrors.nickname = "닉네임을 입력해주세요.";
  if (!form.height.trim()) nextErrors.height = "키를 입력해주세요.";
  if (!form.weight.trim()) nextErrors.weight = "몸무게를 입력해주세요.";
  if (!form.gender.trim()) nextErrors.gender = "성별을 선택해주세요.";

  if (form.nickname.trim() && form.nickname.trim().length > 10) {
    nextErrors.nickname = "닉네임은 10자 이하로 입력해주세요.";
  }

  const heightNum = Number(form.height);
  if (form.height.trim()) {
    if (!Number.isFinite(heightNum)) {
      nextErrors.height = "키는 숫자로 입력해주세요.";
    } else if (heightNum < 100 || heightNum > 220) {
      nextErrors.height = "키는 100~220 범위로 입력해주세요.";
    }
  }

  const weightNum = Number(form.weight);
  if (form.weight.trim()) {
    if (!Number.isFinite(weightNum)) {
      nextErrors.weight = "몸무게는 숫자로 입력해주세요.";
    } else if (weightNum < 30 || weightNum > 150) {
      nextErrors.weight = "몸무게는 30~150 범위로 입력해주세요.";
    }
  }

  const normalizedGender = form.gender.trim().toUpperCase();
  if (
    form.gender.trim() &&
    !GENDER_VALUES.includes(normalizedGender as Gender)
  ) {
    nextErrors.gender = "성별을 다시 선택해주세요.";
  }

  return {
    nextErrors,
    payload: {
      nickname: form.nickname.trim(),
      height: heightNum,
      weight: weightNum,
      gender: normalizedGender as Gender,
    },
  };
};

const submitProfile = async (
  form: ProfileFormValue,
  refetch: () => Promise<void>,
  onUnauthorized: () => void,
  setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
  setFormErrors: React.Dispatch<React.SetStateAction<ProfileFormErrors>>,
) => {
  const { nextErrors, payload } = validateForm(form);
  setFormErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    return;
  }

  try {
    await updateMyProfileAction(payload as UpdateMyProfilePayload);
    await refetch();
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      onUnauthorized();
      return;
    }

    setSubmitError(
      error instanceof ApiRequestError
        ? error.message
        : "프로필 수정 중 오류가 발생했습니다.",
    );
  }
};

export { submitProfile, type ProfileFormErrors, type ProfileFormValue };
