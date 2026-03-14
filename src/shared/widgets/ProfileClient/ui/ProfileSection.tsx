import { ActionButton } from "@/shared/components/Button";
import { profileClientStyle } from "../style";
import ProfileFormFields from "./ProfileFormFields";
import type {
  ProfileFormErrors,
  ProfileFormValue,
} from "../model/profileFormHelpers";

interface ProfileSectionProps {
  form: ProfileFormValue;
  formErrors: ProfileFormErrors;
  submitError: string | null;
  authError: string | null;
  isSubmitting: boolean;
  isReady: boolean;
  isDirty: boolean;
  email?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ProfileSection = (props: ProfileSectionProps) => {
  const {
    form: formStyle,
    title,
    errorText,
    emailText,
    hintText,
  } = profileClientStyle();
  const isSaveDisabled = !props.isReady || !props.isDirty || props.isSubmitting;

  return (
    <form onSubmit={props.handleSubmit} className={formStyle()}>
      <h1 className={title()}>프로필</h1>

      <ProfileFormFields
        form={props.form}
        formErrors={props.formErrors}
        handleChange={props.handleChange}
      />

      {props.submitError || props.authError ? (
        <p className={errorText()}>{props.submitError ?? props.authError}</p>
      ) : null}

      <ActionButton
        type="submit"
        label={props.isSubmitting ? "저장 중…" : "저장"}
        className="w-full mt-2"
        disabled={isSaveDisabled}
      />

      <div className={emailText()}>현재 이메일: {props.email ?? "-"}</div>
      {!props.isReady ? (
        <div className={hintText()}>
          닉네임/키/몸무게/성별을 모두 입력하면 저장할 수 있어요.
        </div>
      ) : null}
    </form>
  );
};

export default ProfileSection;
