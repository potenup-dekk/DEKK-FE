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
  isDirty: boolean;
  isLoggingOut: boolean;
  email?: string;
  onLogout: () => Promise<void>;
  onWithdraw: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ProfileFormView = (props: ProfileFormViewProps) => {
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
            form={props.form}
            formErrors={props.formErrors}
            submitError={props.submitError}
            authError={props.authError}
            isSubmitting={props.isSubmitting}
            isReady={props.isReady}
            isDirty={props.isDirty}
            email={props.email}
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
          />

          <SettingsSection
            settingsError={props.settingsError}
            isLoggingOut={props.isLoggingOut}
            onLogout={props.onLogout}
            onWithdraw={props.onWithdraw}
          />
        </Section>
      </SelectTab>
    </div>
  );
};

export default ProfileFormView;
