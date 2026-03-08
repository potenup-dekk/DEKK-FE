import { tv } from "tailwind-variants";

const cardStyle = tv({
  slots: {
    frontRoot:
      "relative w-5/6 aspect-1/1.5 z-10 rounded-lg flex items-center justify-center cursor-pointer",
    frontOverlay:
      "flex absolute items-center z-20 size-full pointer-events-none rounded-lg",
    frontLike: "flex absolute flex-col gap-2 left-10 text-white",
    frontDislike: "flex absolute flex-col gap-2 right-10 text-white text-end",
    frontFlipper: "relative size-full rounded-lg",
    backRoot:
      "absolute w-5/6 aspect-1/1.5 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden",
    backInner: "relative size-full",
  },
});

export { cardStyle };
