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
  email?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ProfileSection = ({
  form,
  formErrors,
  submitError,
  authError,
  isSubmitting,
  isReady,
  email,
  handleChange,
  handleSubmit,
}: ProfileSectionProps) => {
  const {
    form: formStyle,
    title,
    errorText,
    emailText,
    hintText,
  } = profileClientStyle();

  return (
    <form onSubmit={handleSubmit} className={formStyle()}>
      <h1 className={title()}>프로필</h1>

      <ProfileFormFields
        form={form}
        formErrors={formErrors}
        handleChange={handleChange}
      />

      {submitError || authError ? (
        <p className={errorText()}>{submitError ?? authError}</p>
      ) : null}

      <ActionButton
        type="submit"
        label={isSubmitting ? "저장 중…" : "저장"}
        className="w-full mt-2"
      />

      <div className={emailText()}>현재 이메일: {email ?? "-"}</div>
      {!isReady ? (
        <div className={hintText()}>
          키/몸무게/성별을 모두 입력하면 저장할 수 있어요.
        </div>
      ) : null}
    </form>
  );
};

export default ProfileSection;
