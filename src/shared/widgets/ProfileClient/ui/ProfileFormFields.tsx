import InputField from "@/shared/components/Input";
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

      <InputField
        id="gender"
        name="gender"
        label="성별"
        type="text"
        placeholder="MALE / FEMALE / OTHER"
        value={form.gender}
        onChange={handleChange}
        error={formErrors.gender}
      />
    </>
  );
};

export default ProfileFormFields;
