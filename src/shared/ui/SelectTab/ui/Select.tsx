import { Children, cloneElement, isValidElement } from "react";
import { motion } from "framer-motion";
import {
  getSelectIndicatorAnimate,
  selectIndicatorTransition,
} from "../model/animate";
import type { SelectItemProps, SelectProps } from "../props.type";
import { selectTabStyle } from "../style";
import { useSelectTabContext } from "./context";

const Select = ({ children }: SelectProps) => {
  const { activeIndex } = useSelectTabContext();
  const childCount = Children.count(children);
  const { selectContainer, selectIndicator, selectItems } = selectTabStyle();
  const selectItemsWithIndex = Children.map(children, (child, index) => {
    if (!isValidElement<SelectItemProps>(child)) {
      return child;
    }

    return cloneElement(child, { itemIndex: index });
  });

  return (
    <div className={selectContainer()}>
      {childCount > 0 ? (
        <motion.div
          className={selectIndicator()}
          style={{ width: `calc((100% - 0.5rem) / ${childCount})` }}
          animate={getSelectIndicatorAnimate(activeIndex)}
          transition={selectIndicatorTransition}
        />
      ) : null}

      <div className={selectItems()}>{selectItemsWithIndex}</div>
    </div>
  );
};

export default Select;
