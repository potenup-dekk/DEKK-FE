"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputField } from "@/shared/components/Input";
import { ActionButton } from "@/shared/components/Button";
import { requestJson, ApiRequestError } from "@/shared/api/client";

type Gender = "MALE" | "FEMALE" | "OTHER";

type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

// 온보딩은 Void 응답
type VoidData = null;

export default function JoinPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nickname: "",
    height: "",
    weight: "",
    gender: "" as "" | Gender,
  });

  const [errors, setErrors] = useState<{
    nickname?: string;
    height?: string;
    weight?: string;
    gender?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    !!form.nickname.trim() &&
    !!form.height.trim() &&
    !!form.weight.trim() &&
    !!form.gender.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // 사용자가 수정하면 해당 필드 에러는 지워주기
    if (
      name === "nickname" ||
      name === "height" ||
      name === "weight" ||
      name === "gender"
    ) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors: typeof errors = {};

    if (!form.nickname.trim()) nextErrors.nickname = "닉네임은 필수입니다.";
    if (!form.height.trim()) nextErrors.height = "키는 필수입니다.";
    if (!form.weight.trim()) nextErrors.weight = "몸무게는 필수입니다.";
    if (!form.gender) nextErrors.gender = "성별을 선택해주세요.";

    // 클라 검증(백엔드 검증과 완전히 동일할 필요는 없고, UX용)
    if (form.height.trim()) {
      const heightNum = Number(form.height);
      if (!Number.isFinite(heightNum))
        nextErrors.height = "키는 숫자로 입력해주세요.";
      else if (heightNum < 100 || heightNum > 220)
        nextErrors.height = "키는 100~220 범위로 입력해주세요.";
    }

    if (form.weight.trim()) {
      const weightNum = Number(form.weight);
      if (!Number.isFinite(weightNum))
        nextErrors.weight = "몸무게는 숫자로 입력해주세요.";
      else if (weightNum < 30 || weightNum > 150)
        nextErrors.weight = "몸무게는 30~150 범위로 입력해주세요.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      nickname: form.nickname.trim(),
      height: Number(form.height),
      weight: Number(form.weight),
      gender: form.gender as Gender,
    };

    setIsSubmitting(true);
    try {
      // 확정된 온보딩 엔드포인트
      await requestJson<ApiResponse<VoidData>>("/w/v1/users/onboarding", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // 온보딩 완료 후에는 내 정보로 status 확인하고 이동하는 게 안전함
      // (토큰 claim status는 갱신 안 되었을 수 있으므로)
      const me = await requestJson<
        ApiResponse<{ status: "PENDING" | "ACTIVE" }>
      >("/w/v1/users/me", {
        method: "GET",
      });

      if (me.data.status === "ACTIVE") {
        router.replace("/");
      } else {
        // 서버가 아직 ACTIVE 전환이 아니라면(혹은 저장 지연/정책) 일단 유지
        router.replace("/join");
      }
    } catch (err) {
      // 서버 에러 포맷 매핑
      if (err instanceof ApiRequestError) {
        // 409: 닉네임 중복
        if (err.status === 409) {
          setErrors((prev) => ({
            ...prev,
            nickname: "이미 사용 중인 닉네임입니다.",
          }));
          return;
        }

        // 400: 검증 실패(서버 errors 배열/메시지 활용)
        if (err.status === 400) {
          // 서버 message를 상단 공통 에러로 띄우거나,
          // 여기서는 간단히 nickname에 붙이는 예시 (필요하면 규칙 매핑)
          setErrors((prev) => ({
            ...prev,
            nickname: prev.nickname ?? err.message,
          }));
          return;
        }

        // 401: 인증 문제(토큰 만료/없음) → refresh 붙기 전까진 재로그인 유도
        if (err.status === 401) {
          router.replace("/login");
          return;
        }
      }

      console.error(err);
      // TODO: 토스트/공통 에러 UI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 max-w-md h-screen m-auto"
    >
      <Image src="/logo_dekk.png" alt="DEKK" width={203} height={81} />

      <InputField
        id="nickname"
        name="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        value={form.nickname}
        onChange={handleChange}
        maxLength={10} // BE 검증: 2~10
        showCount
        error={errors.nickname}
      />

      <InputField
        id="height"
        name="height"
        label="키"
        type="number"
        placeholder="174"
        value={form.height}
        onChange={handleChange}
        error={errors.height}
      />

      <InputField
        id="weight"
        name="weight"
        label="몸무게"
        type="number"
        placeholder="74"
        value={form.weight}
        onChange={handleChange}
        error={errors.weight}
      />

      <div className="flex flex-col items-start text-black w-full">
        <p className="text-xs">성별</p>
        <div className="flex gap-6 my-1">
          <label className="flex items-center gap-2">
            <input
              name="gender"
              type="radio"
              value="MALE"
              checked={form.gender === "MALE"}
              onChange={handleChange}
            />
            <span>남성</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              name="gender"
              type="radio"
              value="FEMALE"
              checked={form.gender === "FEMALE"}
              onChange={handleChange}
            />
            <span>여성</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              name="gender"
              type="radio"
              value="OTHER"
              checked={form.gender === "OTHER"}
              onChange={handleChange}
            />
            <span>기타</span>
          </label>
        </div>

        <div className="flex justify-between text-sm self-end">
          <span className={errors.gender ? "text-red-500" : "text-gray-500"}>
            {errors.gender ?? null}
          </span>
        </div>
      </div>

      <ActionButton
        type="submit"
        label={isSubmitting ? "가입 처리 중…" : "가입하기"}
      />
    </form>
  );
}
