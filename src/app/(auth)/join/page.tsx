"use client";

import { InputField } from "../../../shared/components/Input";
import Image from "next/image";
import { useState } from "react";
import { JoinProfile } from "@/shared/api/auth";

export default function JoinPage() {
  const [form, setForm] = useState({
    nickname: "",
    height: "",
    weight: "",
    gender: "",
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
    if (
      name === "nickname" ||
      name === "height" ||
      name === "weight" ||
      name === "gender"
    ) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: typeof errors = {}; // 초기화

    if (!form.nickname.trim()) nextErrors.nickname = "닉네임은 필수입니다.";
    if (!form.height.trim()) nextErrors.height = "키는 필수입니다.";
    if (!form.weight.trim()) nextErrors.weight = "몸무게는 필수입니다.";
    if (!form.gender) nextErrors.gender = "성별을 선택해주세요.";

    if (form.height.trim()) {
      const heightNum = Number(form.height);
      if (!Number.isFinite(heightNum))
        nextErrors.height = "키는 숫자로 입력해주세요.";
      else if (heightNum < 50 || heightNum > 250)
        nextErrors.height = "키는 50~250 범위로 입력해주세요.";
    }

    if (form.weight.trim()) {
      const weightNum = Number(form.weight);
      if (!Number.isFinite(weightNum))
        nextErrors.weight = "몸무게는 숫자로 입력해주세요.";
      else if (weightNum < 10 || weightNum > 300)
        nextErrors.weight = "몸무게는 10~300 범위로 입력해주세요.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (Object.keys(nextErrors).length === 0) {
      const payload = {
        nickname: form.nickname.trim(),
        height: Number(form.height),
        weight: Number(form.weight),
        gender: form.gender,
      };
      console.log(payload);
    }

    setIsSubmitting(true);
    try {
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 max-w-md h-screen m-auto"
    >
      <Image src="/logo_dekk.png" alt="DEKK" width={203} height={81}></Image>
      <InputField
        id="nickname"
        name="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        value={form.nickname}
        onChange={handleChange}
        maxLength={20}
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

      <button
        type="submit"
        disabled={isSubmitting} // TODO: 빈값에 따라 버튼 활성화 여부 검증이 필요한지 !isValid
        className="w-full mb-10 mt-auto rounded bg-[#333333] px-4 py-3 text-white cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? "가입 중..." : "가입하기"}
      </button>
    </form>
  );
}
