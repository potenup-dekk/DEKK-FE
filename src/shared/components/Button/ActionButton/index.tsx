"use client";

import { ActionButtonProps } from "./props.type";
import actionButtonStyle from "./style";

const ActionButton = ({
  label,
  color,
  size,
  onClick,
  type = "button",
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      className={actionButtonStyle({ color, size })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
