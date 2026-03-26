"use client";

import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import type { SelectTabProps } from "../props.type";
import { selectTabStyle } from "../style";
import { SelectTabContext } from "./context";

const clampIndex = (index: number) => {
  return Number.isFinite(index) && index >= 0 ? Math.floor(index) : 0;
};

const SelectTab = ({ children, defaultIndex = 0 }: SelectTabProps) => {
  const safeDefaultIndex = clampIndex(defaultIndex);
  const [activeIndex, setActiveIndexState] = useState(safeDefaultIndex);
  const [previousIndex, setPreviousIndex] = useState(safeDefaultIndex);
  const { root } = selectTabStyle();

  const setActiveIndex = useCallback((nextIndex: number) => {
    const safeNextIndex = clampIndex(nextIndex);

    setActiveIndexState((previousActiveIndex) => {
      setPreviousIndex(previousActiveIndex);
      return safeNextIndex;
    });
  }, []);

  const direction =
    activeIndex === previousIndex ? 0 : activeIndex > previousIndex ? 1 : -1;

  const contextValue = useMemo(
    () => ({
      activeIndex,
      direction,
      setActiveIndex,
    }),
    [activeIndex, direction, setActiveIndex],
  );

  return (
    <SelectTabContext.Provider value={contextValue}>
      <div className={root()}>{children as ReactNode}</div>
    </SelectTabContext.Provider>
  );
};

export default SelectTab;
