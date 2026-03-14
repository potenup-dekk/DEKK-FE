import InputField from "@/shared/components/Input";
import ProfileGenderField from "./ProfileGenderField";
import type {
  ProfileFormErrors,
  ProfileFormValue,
} from "../model/profileFormHelpers";

interface ProfileFormFieldsProps {
  form: ProfileFormValue;
  formErrors: ProfileFormErrors;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileFormFields = ({
  form,
  formErrors,
  handleChange,
}: ProfileFormFieldsProps) => {
  return (
    <>
      <InputField
        id="nickname"
        name="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        value={form.nickname}
        onChange={handleChange}
        maxLength={10}
        showCount
        error={formErrors.nickname}
      />

      <InputField
        id="height"
        name="height"
        label="키"
        type="number"
        placeholder="174"
        value={form.height}
        onChange={handleChange}
        error={formErrors.height}
      />

      <InputField
        id="weight"
        name="weight"
        label="몸무게"
        type="number"
        placeholder="74"
        value={form.weight}
        onChange={handleChange}
        error={formErrors.weight}
      />

      <ProfileGenderField
        value={form.gender}
        onChange={handleChange}
        error={formErrors.gender}
      />
    </>
  );
};

export default ProfileFormFields;
