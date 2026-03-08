import { ApiRequestError } from "@/shared/api/fetcher/client";
import { updateMyProfileAction } from "@/shared/api/actions";
import type { Gender, UpdateMyProfilePayload } from "@/entities/user";

interface ProfileFormValue {
  height: string;
  weight: string;
  gender: string;
}

interface ProfileFormErrors {
  height?: string;
  weight?: string;
  gender?: string;
}

const validateForm = (form: ProfileFormValue) => {
  const nextErrors: ProfileFormErrors = {};

  if (!form.height.trim()) nextErrors.height = "키를 입력해주세요.";
  if (!form.weight.trim()) nextErrors.weight = "몸무게를 입력해주세요.";
  if (!form.gender.trim()) nextErrors.gender = "성별을 입력해주세요.";

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
    !["MALE", "FEMALE", "OTHER"].includes(normalizedGender)
  ) {
    nextErrors.gender = "성별은 MALE / FEMALE / OTHER 중 하나로 입력해주세요.";
  }

  return {
    nextErrors,
    payload: {
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
