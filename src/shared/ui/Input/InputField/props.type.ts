import type { InputHTMLAttributes, ChangeEventHandler, ReactNode } from "react";

type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange" | "size"
>;

export interface InputFieldProps extends BaseInputProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;

  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;

  showCount?: boolean;
  maxLength?: number;

  disabled?: boolean;
  id?: string;
  name?: string;

  size?: "md" | "sm";
}
