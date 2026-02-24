import Image from "next/image";
import type { SocialButtonProps } from "./props.type";

const SocialButton = ({
  iconSrc,
  iconAlt,
  label,
  onClick,
  className,
  disabled = false,
}: SocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "flex items-center justify-center gap-2.5 min-w-75 h-15 rounded-lg text-xl lh-1 py-1.5",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
      <span>{label}</span>
    </button>
  );
};

export default SocialButton;
