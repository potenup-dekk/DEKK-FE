import { ApiRequestError } from "@/shared/api/fetcher/client";
import { completeOnboarding, getMyInfo } from "@/features/profile";
import prefetchAndReplace from "@/shared/hooks/prefetchAndReplace";
import type {
  JoinFormErrors,
  JoinFormValue,
  JoinPayload,
  RouterLike,
} from "./joinForm.types";

const getRequiredErrors = (form: JoinFormValue): JoinFormErrors => {
  const errors: JoinFormErrors = {};
  if (!form.nickname.trim()) errors.nickname = "닉네임은 필수입니다.";
  if (!form.height.trim()) errors.height = "키는 필수입니다.";
  if (!form.weight.trim()) errors.weight = "몸무게는 필수입니다.";
  if (!form.gender) errors.gender = "성별을 선택해주세요.";
  return errors;
};

const getRangeErrors = (form: JoinFormValue): JoinFormErrors => {
  const errors: JoinFormErrors = {};
  if (form.height.trim()) {
    const heightNum = Number(form.height);
    if (!Number.isFinite(heightNum)) {
      errors.height = "키는 숫자로 입력해주세요.";
    } else if (heightNum < 100 || heightNum > 220) {
      errors.height = "키는 100~220 범위로 입력해주세요.";
    }
  }

  if (form.weight.trim()) {
    const weightNum = Number(form.weight);
    if (!Number.isFinite(weightNum)) {
      errors.weight = "몸무게는 숫자로 입력해주세요.";
    } else if (weightNum < 30 || weightNum > 150) {
      errors.weight = "몸무게는 30~150 범위로 입력해주세요.";
    }
  }
  return errors;
};

const getValidationErrors = (form: JoinFormValue): JoinFormErrors => {
  return {
    ...getRequiredErrors(form),
    ...getRangeErrors(form),
  };
};

const buildPayload = (form: JoinFormValue): JoinPayload => {
  return {
    nickname: form.nickname.trim(),
    height: Number(form.height),
    weight: Number(form.weight),
    gender: form.gender as JoinPayload["gender"],
  };
};

const handleJoinError = (
  error: unknown,
  router: RouterLike,
  setErrors: React.Dispatch<React.SetStateAction<JoinFormErrors>>,
) => {
  if (!(error instanceof ApiRequestError)) {
    console.error(error);
    return;
  }

  if (error.status === 409) {
    setErrors((prev) => ({
      ...prev,
      nickname: "이미 사용 중인 닉네임입니다.",
    }));
    return;
  }

  if (error.status === 400) {
    setErrors((prev) => ({
      ...prev,
      nickname: prev.nickname ?? error.message,
    }));
    return;
  }

  if (error.status === 401) {
    prefetchAndReplace(router, "/login");
  }
};

const submitOnboarding = async (
  form: JoinFormValue,
  router: RouterLike,
  setErrors: React.Dispatch<React.SetStateAction<JoinFormErrors>>,
) => {
  try {
    await completeOnboarding(buildPayload(form));
    const me = await getMyInfo();
    const status = me.data?.status;

    if (!status) {
      prefetchAndReplace(router, "/login");
      return;
    }

    prefetchAndReplace(router, status === "ACTIVE" ? "/" : "/join");
  } catch (error) {
    handleJoinError(error, router, setErrors);
  }
};

export { getValidationErrors, submitOnboarding };
