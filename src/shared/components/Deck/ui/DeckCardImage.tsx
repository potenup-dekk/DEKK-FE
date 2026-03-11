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
      className={`${className ?? "h-full w-full object-cover"} pointer-events-none select-none`}
      alt={alt}
      fill
      draggable={false}
      onDragStart={(event) => {
        event.preventDefault();
      }}
      // sizes="(max-width: 768px) 44vw, 320px"
    />
  );
};

export default DeckCardImage;
