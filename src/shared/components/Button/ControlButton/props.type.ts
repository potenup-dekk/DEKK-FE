import { LucideIcon } from "lucide-react";

type Color = "primary" | "secondary";

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  color?: Color;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type { ControlButtonProps };
