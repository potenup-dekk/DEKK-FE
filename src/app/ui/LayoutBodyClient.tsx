"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { USE_MOCK } from "@/shared/config/env";
import { useLayoutChromeVisibility } from "@/shared/hooks";

interface LayoutBodyClientProps {
  children: React.ReactNode;
}

const LayoutBodyClient = ({ children }: LayoutBodyClientProps) => {
  const { isChromeVisible } = useLayoutChromeVisibility();
  const [isMockReady, setIsMockReady] = useState(!USE_MOCK);

  useEffect(() => {
    if (!USE_MOCK) {
      return;
    }

    let isMounted = true;

    const initializeMocking = async () => {
      const { default: startMocking } = await import("../../shared/mocks/browser");

      await startMocking();

      if (isMounted) {
        setIsMockReady(true);
      }
    };

    void initializeMocking();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isMockReady) {
    return <div className="flex min-h-0 flex-1" />;
  }

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
