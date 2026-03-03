import React from "react";
import { ControlButtonProps } from "./props.type";
import controlButtonStyle from "./style";

const ControlButton = ({
  icon: Icon,
  label,
  color,
  onClick,
}: ControlButtonProps) => {
  return (
    <button className={controlButtonStyle({ color })} onClick={onClick}>
      <Icon size={16} />

      <span>{label}</span>
    </button>
  );
};

export default ControlButton;
