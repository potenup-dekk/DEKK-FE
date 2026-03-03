import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
}

interface TabItemProps {
  icon: LucideIcon;
  label: string;
  selected?: boolean;

  onClick?: () => void;
}

export type { TabProps, TabItemProps };
