import InputField from "@/shared/components/Input";
import GenderField from "./GenderField";
import type { JoinFormValue, JoinFormErrors } from "../model/joinForm.types";

interface JoinFormFieldsProps {
  form: JoinFormValue;
  errors: JoinFormErrors;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinFormFields = ({ form, errors, onChange }: JoinFormFieldsProps) => {
  return (
    <>
      <InputField
        id="nickname"
        name="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        value={form.nickname}
        onChange={onChange}
        maxLength={10}
        showCount
        error={errors.nickname}
      />

      <InputField
        id="height"
        name="height"
        label="키"
        type="number"
        placeholder="174"
        value={form.height}
        onChange={onChange}
        error={errors.height}
      />

      <InputField
        id="weight"
        name="weight"
        label="몸무게"
        type="number"
        placeholder="74"
        value={form.weight}
        onChange={onChange}
        error={errors.weight}
      />

      <GenderField
        value={form.gender}
        error={errors.gender}
        onChange={onChange}
      />
    </>
  );
};

export default JoinFormFields;
