import BottomMessage from "./BottomMessage";
import InputControl from "./InputControl";
import InputLabel from "./InputLabel";

interface InputFieldViewProps {
  label?: React.ReactNode;
  inputId?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  maxLength?: number;
  shouldShowCount: boolean;
  message: React.ReactNode;
  styles: {
    root: () => string;
    label: () => string;
    input: () => string;
    bottom: () => string;
    message: () => string;
    count: () => string;
  };
  rest: Record<string, unknown>;
}

const InputFieldView = ({
  label,
  inputId,
  name,
  value,
  onChange,
  disabled,
  maxLength,
  shouldShowCount,
  message,
  styles,
  rest,
}: InputFieldViewProps) => {
  return (
    <div className={styles.root()}>
      <InputLabel label={label} inputId={inputId} className={styles.label()} />
      <InputControl
        inputId={inputId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        className={styles.input()}
        rest={rest}
      />
      <div className={styles.bottom()}>
        <BottomMessage
          message={message}
          valueLength={value.length}
          maxLength={maxLength}
          shouldShowCount={shouldShowCount}
          messageClassName={styles.message()}
          countClassName={styles.count()}
        />
      </div>
    </div>
  );
};

export default InputFieldView;
