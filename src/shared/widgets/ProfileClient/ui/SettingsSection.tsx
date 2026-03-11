import { ActionButton } from "@/shared/components/Button";
import { profileClientStyle } from "../style";

interface SettingsSectionProps {
  settingsError: string | null;
  isLoggingOut: boolean;
  onLogout: () => Promise<void>;
  onWithdraw: () => void;
}

const SettingsSection = ({
  settingsError,
  isLoggingOut,
  onLogout,
  onWithdraw,
}: SettingsSectionProps) => {
  const { sectionCard, sectionTitle, sectionDescription, errorText } =
    profileClientStyle();

  return (
    <section className={sectionCard()}>
      <h2 className={sectionTitle()}>설정</h2>
      <p className={sectionDescription()}>
        계정 관련 작업을 진행할 수 있습니다.
      </p>

      <ActionButton
        type="button"
        color="secondary"
        label={isLoggingOut ? "로그아웃 중…" : "로그아웃"}
        className="w-full"
        onClick={() => {
          void onLogout();
        }}
      />

      <ActionButton
        type="button"
        color="cancel"
        label="회원탈퇴"
        className="w-full"
        onClick={onWithdraw}
      />

      {settingsError ? <p className={errorText()}>{settingsError}</p> : null}
    </section>
  );
};

export default SettingsSection;
