import Image from "next/image";

interface DeckCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const DeckCardImage = ({ src, alt, className }: DeckCardImageProps) => {
  return (
    <Image
      src={src}
      className={className ?? "pointer-events-none h-full w-full object-cover"}
      alt={alt}
      fill
      // sizes="(max-width: 768px) 44vw, 320px"
    />
  );
};

export default DeckCardImage;
