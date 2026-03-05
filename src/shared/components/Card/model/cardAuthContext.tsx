"use client";

import { createContext, useContext, type ReactNode } from "react";

type CardAuthContextValue = {
  isLoggedIn: boolean;
};

const CardAuthContext = createContext<CardAuthContextValue>({
  isLoggedIn: false,
});

type CardAuthProviderProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

export function CardAuthProvider({ isLoggedIn, children }: CardAuthProviderProps) {
  return (
    <CardAuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </CardAuthContext.Provider>
  );
}

export function useCardAuth() {
  return useContext(CardAuthContext);
}
