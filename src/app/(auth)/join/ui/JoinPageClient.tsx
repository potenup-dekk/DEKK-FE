"use client";

import Image from "next/image";
import { ActionButton } from "@/shared/components/Button";
import useJoinForm from "../model/useJoinForm";
import JoinFormFields from "./JoinFormFields";
import { joinPageStyle } from "./style";

const JoinPageClient = () => {
  const { form, errors, isSubmitting, handleChange, handleSubmit, cancelJoin } =
    useJoinForm();
  const { form: formStyle, logoWrap, submitArea, skipButton } = joinPageStyle();

  return (
    <form onSubmit={handleSubmit} className={formStyle()}>
      <div className={logoWrap()}>
        <Image src="/logo_dekk.png" alt="DEKK" width={203} height={81} />
      </div>

      <JoinFormFields form={form} errors={errors} onChange={handleChange} />

      <div className={submitArea()}>
        <ActionButton
          type="submit"
          label={isSubmitting ? "가입 처리 중…" : "가입하기"}
          className="w-full"
        />
        <button type="button" onClick={cancelJoin} className={skipButton()}>
          다음에 할게요
        </button>
      </div>
    </form>
  );
};

export default JoinPageClient;
