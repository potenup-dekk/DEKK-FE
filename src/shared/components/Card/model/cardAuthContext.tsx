"use client";

import { createContext, useContext, type ReactNode } from "react";

interface CardAuthContextValue {
  isLoggedIn: boolean;
}

const CardAuthContext = createContext<CardAuthContextValue>({
  isLoggedIn: false,
});

interface CardAuthProviderProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

const CardAuthProvider = ({ isLoggedIn, children }: CardAuthProviderProps) => {
  return (
    <CardAuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </CardAuthContext.Provider>
  );
};

const useCardAuth = () => {
  return useContext(CardAuthContext);
};

export { CardAuthProvider, useCardAuth };
