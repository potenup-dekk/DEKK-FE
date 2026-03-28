"use client";

import { useEffect, useRef } from "react";
import trackGtmEvent from "@/shared/lib/trackGtmEvent";

interface LayoutBodyClientProps {
  children: React.ReactNode;
}

const LayoutBodyClient = ({ children }: LayoutBodyClientProps) => {
  const didTrackExitRef = useRef(false);

  useEffect(() => {
    const trackExit = () => {
      if (didTrackExitRef.current) {
        return;
      }

      didTrackExitRef.current = true;
      trackGtmEvent("service_exit", {
        page_path: window.location.pathname,
      });
    };

    const handlePageHide = () => {
      trackExit();
    };

    const handleBeforeUnload = () => {
      trackExit();
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <div className="flex min-h-0 flex-1 pb-20">{children}</div>;
};

export default LayoutBodyClient;
