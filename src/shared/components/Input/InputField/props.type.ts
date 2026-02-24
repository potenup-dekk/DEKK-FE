import type { HTMLInputTypeAttribute } from "react";

type InputType = HTMLInputTypeAttribute;

interface InputFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  type?: InputType;
  id?: string;
  maxLength?: number;
  showCount?: boolean;
}

export type { InputFieldProps };
