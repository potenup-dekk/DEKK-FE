import type { InputFieldProps } from "./props.type";
import { inputFieldStyle } from "./style";
import InputFieldView from "./InputFieldView";

const InputField = ({
  label,
  hint,
  error,
  value,
  onChange,
  disabled = false,
  name,
  id,
  maxLength,
  showCount,
  size = "sm",
  ...rest
}: InputFieldProps) => {
  const inputId = id ?? name;
  const hasError = Boolean(error);
  const shouldShowCount =
    !hasError && showCount && typeof maxLength === "number";
  const message = hasError ? error : hint;

  const styles = inputFieldStyle({
    state: hasError ? "error" : "default",
    disabled,
    size,
  });

  return (
    <InputFieldView
      label={label}
      inputId={inputId}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
      shouldShowCount={Boolean(shouldShowCount)}
      message={message}
      styles={styles}
      rest={rest as Record<string, unknown>}
    />
  );
};

export default InputField;
