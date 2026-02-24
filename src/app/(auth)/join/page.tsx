"use client";
import { InputField } from "../../..//shared/components/Input";
import Image from "next/image";
import { useState } from "react";

export default function JoinPage() {
  const [form, setForm] = useState({
    nickname: "",
    height: "",
    weight: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center gap-4">
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
      />
      <InputField
        id="height"
        name="height"
        label="키"
        type="text"
        placeholder="키를 입력하세요"
        value={form.height}
        onChange={handleChange}
        hint="CM"
      />

      <InputField
        id="weight"
        name="weight"
        label="몸무게"
        type="text"
        placeholder="몸무게를 입력하세요"
        value={form.weight}
        onChange={handleChange}
        hint="KG"
      />
    </div>
  );
}
