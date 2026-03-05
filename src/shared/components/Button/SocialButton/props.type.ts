interface SocialButtonProps {
  iconSrc: string;
  iconAlt: string;
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export type { SocialButtonProps };
