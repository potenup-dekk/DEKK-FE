import Image from "next/image";
import type { SocialButtonProps } from "./props.type";

// clsx, tailwind variants
// tailwind => style관리가 어려움!
//
// tailwind 장점!
// 1. palette => color 정의되어있음.
// 2. 디자인 시스템 구축 용이
// 3.

// scss =>

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
        "flex items-center justify-center gap-2.5 min-w-75 w-full h-15 rounded-lg text-xl lh-1 py-1.5",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}

      // csswegwegrgwqf.css
      // display: flex;
      // .flex {
      // display:flex;
      // }
    >
      <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
      <span>{label}</span>
    </button>
  );
};

export default SocialButton;
