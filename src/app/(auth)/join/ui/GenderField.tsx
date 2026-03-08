import type { Gender } from "@/entities/user";
import { genderFieldStyle } from "./style";

interface GenderFieldProps {
  value: "" | Gender;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
  { value: "MALE", label: "남성" },
  { value: "FEMALE", label: "여성" },
  { value: "OTHER", label: "기타" },
];

const GenderField = ({ value, error, onChange }: GenderFieldProps) => {
  const {
    root,
    row,
    options,
    optionLabel,
    optionText,
    helperRow,
    errorText,
    normalText,
  } = genderFieldStyle();

  return (
    <div className={root()}>
      <div className={row()}>
        <p className={optionText()}>성별</p>
        <div className={options()}>
          {GENDER_OPTIONS.map((option) => (
            <label key={option.value} className={optionLabel()}>
              <input
                name="gender"
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
              />
              <span className={optionText()}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={helperRow()}>
        <span className={error ? errorText() : normalText()}>
          {error ?? null}
        </span>
      </div>
    </div>
  );
};

export default GenderField;
