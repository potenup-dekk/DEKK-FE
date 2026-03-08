import Image from "next/image";
import CEO from "../../../../../public/ceo.png";

const DeckCardImage = () => {
  return (
    <Image
      src={CEO}
      className="object-cover h-full w-full pointer-events-none"
      alt=""
    />
  );
};

export default DeckCardImage;
