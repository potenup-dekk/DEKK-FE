interface InputLabelProps {
  label?: React.ReactNode;
  inputId?: string;
  className: string;
}

const InputLabel = ({ label, inputId, className }: InputLabelProps) => {
  if (!label) return null;

  return (
    <label className={className} htmlFor={inputId}>
      {label}
    </label>
  );
};

export default InputLabel;
