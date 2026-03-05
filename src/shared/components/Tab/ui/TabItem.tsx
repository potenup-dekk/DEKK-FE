import { TabItemProps } from "../props.type";
import { tabItemStyle } from "../style";

const TabItem = ({ icon: Icon, label, selected, onClick }: TabItemProps) => {
  return (
    <button className={tabItemStyle({ selected })} onClick={onClick}>
      <Icon size={20} strokeWidth={2} className="relative" />

      <span className="relative text-xs">{label}</span>
    </button>
  );
};

export default TabItem;
