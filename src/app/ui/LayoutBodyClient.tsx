"use client";

import clsx from "clsx";
import { useLayoutChromeVisibility } from "@/shared/hooks";

interface LayoutBodyClientProps {
  children: React.ReactNode;
}

const LayoutBodyClient = ({ children }: LayoutBodyClientProps) => {
  const { isChromeVisible } = useLayoutChromeVisibility();

  return (
    <div
      className={clsx(
        "flex min-h-0 flex-1",
        isChromeVisible ? "pb-20" : "pb-0",
      )}
    >
      {children}
    </div>
  );
};

export default LayoutBodyClient;
