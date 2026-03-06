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

      <span className="md:flex hidden">{label}</span>
    </button>
  );
};

export default ControlButton;
