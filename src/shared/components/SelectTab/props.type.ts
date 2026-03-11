import type { ReactNode } from "react";

interface SelectTabProps {
  children: ReactNode;
  defaultIndex?: number;
}

interface SelectProps {
  children: ReactNode;
}

interface SelectItemProps {
  label: string;
  itemIndex?: number;
}

interface SelectItemViewProps extends SelectItemProps {
  isSelected: boolean;
  itemIndex: number;
}

interface SectionProps {
  children: ReactNode;
}

export type {
  SectionProps,
  SelectItemProps,
  SelectItemViewProps,
  SelectProps,
  SelectTabProps,
};
