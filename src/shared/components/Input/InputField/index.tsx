import type { InputFieldProps } from "./props.type";

const InputField = ({
  label,
  hint,
  error,
  value,
  onChange,
  placeholder,
  disabled = false,
  name,
  type,
  id,
  maxLength,
  showCount,
}: InputFieldProps) => {
  const inputId = id ?? name ?? undefined;
  const hasError = Boolean(error);
  const shouldShowCount =
    !hasError && showCount && typeof maxLength === "number";
  const message = hasError ? error : hint;

  return (
    <div className="flex flex-col items-start text-black">
      {label && (
        <label className="text-xs" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[
          "border rounded-sm bg-white px-3 py-2 my-1",
          hasError ? "border-red-500" : "border-black",
        ].join(" ")}
        maxLength={maxLength}
      />

      <div className="flex justify-between text-sm self-end">
        <span className={hasError ? "text-red-500" : "text-gray-500"}>
          {!shouldShowCount ? message : null}
        </span>

        {shouldShowCount ? (
          <span className="text-gray-500">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
