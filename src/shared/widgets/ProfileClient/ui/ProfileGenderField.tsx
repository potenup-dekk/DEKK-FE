import type { Gender } from "@/entities/user";
import { profileClientStyle } from "../style";

interface ProfileGenderFieldProps {
  value: "" | Gender;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
  { value: "MALE", label: "남성" },
  { value: "FEMALE", label: "여성" },
  { value: "OTHER", label: "기타" },
];

const ProfileGenderField = ({
  value,
  error,
  onChange,
}: ProfileGenderFieldProps) => {
  const {
    genderFieldRoot,
    genderFieldRow,
    genderFieldOptions,
    genderFieldOptionLabel,
    genderFieldOptionText,
    genderFieldHelperRow,
    errorText,
    hintText,
  } = profileClientStyle();

  return (
    <div className={genderFieldRoot()}>
      <div className={genderFieldRow()}>
        <p className={genderFieldOptionText()}>성별</p>
        <div className={genderFieldOptions()}>
          {GENDER_OPTIONS.map((option) => {
            return (
              <label key={option.value} className={genderFieldOptionLabel()}>
                <input
                  name="gender"
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                />
                <span className={genderFieldOptionText()}>{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={genderFieldHelperRow()}>
        <span className={error ? errorText() : hintText()}>{error ?? " "}</span>
      </div>
    </div>
  );
};

export default ProfileGenderField;
