"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/shared/components/Input";
import { ActionButton } from "@/shared/components/Button";
import { ApiRequestError } from "@/shared/api/client";
import {
  updateMyProfile,
  type Gender,
  type UpdateMyProfilePayload,
} from "@/shared/api/user";
import { useAuthGuard } from "@/shared/hooks";

const ProfileClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user, error, refetch } = useAuthGuard();

  const [form, setForm] = useState({
    height: "",
    weight: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState<{
    height?: string;
    weight?: string;
    gender?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    setForm({
      height: user.height == null ? "" : String(user.height),
      weight: user.weight == null ? "" : String(user.weight),
      gender: user.gender ?? "",
    });
  }, [user]);

  const isReady = useMemo(
    () => !!form.height.trim() && !!form.weight.trim() && !!form.gender.trim(),
    [form.gender, form.height, form.weight],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "height" || name === "weight" || name === "gender") {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
      setSubmitError(null);
    }
  };

  const validate = () => {
    const nextErrors: typeof formErrors = {};

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
    if (form.gender.trim() && !["MALE", "FEMALE", "OTHER"].includes(normalizedGender)) {
      nextErrors.gender = "성별은 MALE / FEMALE / OTHER 중 하나로 입력해주세요.";
    }

    setFormErrors(nextErrors);
    return {
      isValid: Object.keys(nextErrors).length === 0,
      payload: {
        height: heightNum,
        weight: weightNum,
        gender: normalizedGender as Gender,
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const { isValid, payload } = validate();
    if (!isValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await updateMyProfile(payload as UpdateMyProfilePayload);

      await refetch();
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) {
        router.replace("/login");
        return;
      }

      setSubmitError(
        err instanceof ApiRequestError
          ? err.message
          : "프로필 수정 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-sm">로그인 상태 확인 중…</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md w-full px-4 pt-6 pb-28"
    >
      <h1 className="text-base font-semibold">프로필</h1>

      <InputField
        id="height"
        name="height"
        label="키"
        type="number"
        placeholder="174"
        value={form.height}
        onChange={handleChange}
        error={formErrors.height}
      />

      <InputField
        id="weight"
        name="weight"
        label="몸무게"
        type="number"
        placeholder="74"
        value={form.weight}
        onChange={handleChange}
        error={formErrors.weight}
      />

      <InputField
        id="gender"
        name="gender"
        label="성별"
        type="text"
        placeholder="MALE / FEMALE / OTHER"
        value={form.gender}
        onChange={handleChange}
        error={formErrors.gender}
      />

      {submitError || error ? (
        <p className="text-xs text-red-500">{submitError ?? error}</p>
      ) : null}

      <ActionButton
        type="submit"
        label={isSubmitting ? "저장 중…" : "저장"}
        className="w-full mt-2"
      />

      <div className="text-xs text-[#737373]">현재 이메일: {user?.email ?? "-"}</div>
      {!isReady ? (
        <div className="text-xs text-[#737373]">
          키/몸무게/성별을 모두 입력하면 저장할 수 있어요.
        </div>
      ) : null}
    </form>
  );
};

export default ProfileClient;
