import { createContext, useContext } from "react";

interface SelectTabContextValue {
  activeIndex: number;
  direction: number;
  setActiveIndex: (nextIndex: number) => void;
}

const SelectTabContext = createContext<SelectTabContextValue | null>(null);

const useSelectTabContext = () => {
  const context = useContext(SelectTabContext);

  if (!context) {
    throw new Error(
      "SelectTab compound components must be used within SelectTab.",
    );
  }

  return context;
};

export { SelectTabContext, useSelectTabContext, type SelectTabContextValue };
