import { TagProps } from "../props.type";

const Tag = ({ label }: TagProps) => {
  return (
    <div className="flex px-2 py-1 backdrop-blur-xs bg-gray/25 rounded-full size-fit">
      <span className="text-[11px] text-black">#{label}</span>
    </div>
  );
};

export default Tag;
