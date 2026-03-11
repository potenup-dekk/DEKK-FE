import {
  Section,
  Select,
  SelectItem,
  SelectTab,
} from "@/shared/components/SelectTab";
import type {
  ProfileFormErrors,
  ProfileFormValue,
} from "../model/profileFormHelpers";
import { profileClientStyle } from "../style";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";

interface ProfileFormViewProps {
  form: ProfileFormValue;
  formErrors: ProfileFormErrors;
  submitError: string | null;
  authError: string | null;
  settingsError: string | null;
  isSubmitting: boolean;
  isReady: boolean;
  isLoggingOut: boolean;
  email?: string;
  onLogout: () => Promise<void>;
  onWithdraw: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ProfileFormView = ({
  form,
  formErrors,
  submitError,
  authError,
  settingsError,
  isSubmitting,
  isReady,
  isLoggingOut,
  email,
  onLogout,
  onWithdraw,
  handleChange,
  handleSubmit,
}: ProfileFormViewProps) => {
  const { layout } = profileClientStyle();

  return (
    <div className={layout()}>
      <SelectTab>
        <Select>
          <SelectItem label="프로필" />
          <SelectItem label="설정" />
        </Select>

        <Section>
          <ProfileSection
            form={form}
            formErrors={formErrors}
            submitError={submitError}
            authError={authError}
            isSubmitting={isSubmitting}
            isReady={isReady}
            email={email}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <SettingsSection
            settingsError={settingsError}
            isLoggingOut={isLoggingOut}
            onLogout={onLogout}
            onWithdraw={onWithdraw}
          />
        </Section>
      </SelectTab>
    </div>
  );
};

export default ProfileFormView;
