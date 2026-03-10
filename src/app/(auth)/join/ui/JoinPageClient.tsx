"use client";

import Image from "next/image";
import { ActionButton } from "@/shared/components/Button";
import useJoinForm from "../model/useJoinForm";
import JoinFormFields from "./JoinFormFields";
import { joinPageStyle } from "./style";

const JoinPageClient = () => {
  const { form, errors, isSubmitting, handleChange, handleSubmit, cancelJoin } =
    useJoinForm();
  const { form: formStyle, submitArea } = joinPageStyle();

  return (
    <form onSubmit={handleSubmit} className={formStyle()}>
      <div className="flex flex-col w-full gap-2">
        <JoinFormFields form={form} errors={errors} onChange={handleChange} />
      </div>

      <div className={submitArea()}>
        <ActionButton
          type="button"
          color="secondary"
          label="취소"
          onClick={cancelJoin}
        />
        <ActionButton
          type="submit"
          label={isSubmitting ? "가입 처리 중…" : "가입하기"}
          className="w-full"
        />
      </div>
    </form>
  );
};

export default JoinPageClient;
