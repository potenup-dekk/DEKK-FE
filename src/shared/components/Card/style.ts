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
    focusActionGroup: "absolute right-3 top-3 z-50 flex items-center gap-2",
    focusActionButton:
      "rounded-full p-3 bg-primary/25 text-white backdrop-blur-md transition-colors hover:bg-primary/35",
  },
  variants: {
    isCardCompressed: {
      true: {
        frontRoot: "aspect-auto",
        backRoot: "aspect-auto",
      },
      false: {
        frontRoot: "",
        backRoot: "",
      },
    },
  },
  defaultVariants: {
    isCardCompressed: false,
  },
});

export { cardStyle };
