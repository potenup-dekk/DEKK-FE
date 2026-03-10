import { ActionButtonProps } from "./props.type";
import actionButtonStyle from "./style";

const ActionButton = ({
  label,
  color,
  size,
  onClick,
  type = "button",
  className,
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      className={actionButtonStyle({ color, size, className })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
