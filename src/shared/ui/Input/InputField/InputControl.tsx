import type { InputFieldProps } from "./props.type";

interface InputControlProps {
  inputId?: string;
  name?: string;
  value: string;
  onChange: InputFieldProps["onChange"];
  disabled: boolean;
  maxLength?: number;
  className: string;
  rest: Omit<
    InputFieldProps,
    | "label"
    | "hint"
    | "error"
    | "value"
    | "onChange"
    | "disabled"
    | "name"
    | "id"
    | "maxLength"
    | "showCount"
    | "size"
  >;
}

const InputControl = ({
  inputId,
  name,
  value,
  onChange,
  disabled,
  maxLength,
  className,
  rest,
}: InputControlProps) => {
  return (
    <input
      id={inputId}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
      className={className}
      {...rest}
    />
  );
};

export default InputControl;
