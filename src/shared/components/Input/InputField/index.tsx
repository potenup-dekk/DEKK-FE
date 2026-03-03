"use client";

import type { InputFieldProps } from "./props.type";
import { inputFieldStyle } from "./style";

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
    <div className={styles.root()}>
      {label ? (
        <label className={styles.label()} htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        className={styles.input()}
        {...rest}
      />

      <div className={styles.bottom()}>
        <span className={styles.message()}>
          {!shouldShowCount ? message : null}
        </span>

        {shouldShowCount ? (
          <span className={styles.count()}>
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
