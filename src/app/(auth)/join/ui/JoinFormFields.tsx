import InputField from "@/shared/components/Input";
import GenderField from "./GenderField";
import type { JoinFormValue, JoinFormErrors } from "../model/joinForm.types";

interface JoinFormFieldsProps {
  form: JoinFormValue;
  errors: JoinFormErrors;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JOIN_TEXT_FIELDS = [
  {
    id: "nickname",
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력하세요",
    maxLength: 10,
    showCount: true,
  },
  {
    id: "height",
    name: "height",
    label: "키",
    type: "number",
    placeholder: "174",
  },
  {
    id: "weight",
    name: "weight",
    label: "몸무게",
    type: "number",
    placeholder: "74",
  },
] as const;

const JoinFormFields = ({ form, errors, onChange }: JoinFormFieldsProps) => {
  return (
    <>
      {JOIN_TEXT_FIELDS.map((field) => {
        return (
          <InputField
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={onChange}
            maxLength={"maxLength" in field ? field.maxLength : undefined}
            showCount={"showCount" in field ? field.showCount : undefined}
            error={errors[field.name]}
          />
        );
      })}

      <GenderField
        value={form.gender}
        error={errors.gender}
        onChange={onChange}
      />
    </>
  );
};

export default JoinFormFields;
