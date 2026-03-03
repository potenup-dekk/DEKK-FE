import { TagProps } from "../props.type";

const Tag = ({ label }: TagProps) => {
  return (
    <div className="inline-flex m-0.5 px-2 py-1 backdrop-blur-xs bg-[#E4E4E4]/75 rounded-full size-fit">
      <span className="text-[11px] text-black">#{label}</span>
    </div>
  );
};

export default Tag;
