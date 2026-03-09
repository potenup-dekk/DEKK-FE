"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface LayoutChromeVisibilityContextValue {
  isChromeVisible: boolean;
  setChromeVisible: (visible: boolean) => void;
}

interface LayoutChromeVisibilityProviderProps {
  children: ReactNode;
}

const LayoutChromeVisibilityContext =
  createContext<LayoutChromeVisibilityContextValue | null>(null);

const LayoutChromeVisibilityProvider = ({
  children,
}: LayoutChromeVisibilityProviderProps) => {
  const [isChromeVisible, setIsChromeVisible] = useState(true);

  const setChromeVisible = useCallback((visible: boolean) => {
    setIsChromeVisible(visible);
  }, []);

  const value = useMemo(
    () => ({
      isChromeVisible,
      setChromeVisible,
    }),
    [isChromeVisible, setChromeVisible],
  );

  return (
    <LayoutChromeVisibilityContext.Provider value={value}>
      {children}
    </LayoutChromeVisibilityContext.Provider>
  );
};

const useLayoutChromeVisibility = () => {
  const context = useContext(LayoutChromeVisibilityContext);

  if (!context) {
    throw new Error(
      "useLayoutChromeVisibility must be used within LayoutChromeVisibilityProvider",
    );
  }

  return context;
};

export { LayoutChromeVisibilityProvider, useLayoutChromeVisibility };
