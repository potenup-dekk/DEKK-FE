import type { SelectItemProps } from "../props.type";
import { selectItemStyle } from "../style";
import { useSelectTabContext } from "./context";

const SelectItem = ({ label, itemIndex = 0 }: SelectItemProps) => {
  const { activeIndex, setActiveIndex } = useSelectTabContext();
  const isSelected = activeIndex === itemIndex;

  return (
    <button
      type="button"
      className={selectItemStyle({ selected: isSelected })}
      onClick={() => setActiveIndex(itemIndex)}
    >
      {label}
    </button>
  );
};

export default SelectItem;
