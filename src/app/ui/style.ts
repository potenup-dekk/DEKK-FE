import { tv } from "tailwind-variants";

const homePageStyle = tv({
  slots: {
    page: "relative flex h-full w-full flex-col items-center justify-center gap-3",
    cardWrap: "relative z-60 flex w-full max-w-md items-center justify-center",
    controlsWrap: "flex w-full items-center justify-center",
    controls: "flex w-5/6 items-center justify-between gap-1",
  },
  variants: {
    isFocusMode: {
      true: {
        page: "gap-3",
        cardWrap: "z-60",
        controlsWrap: "z-30 pb-[env(safe-area-inset-bottom)]",
      },
      false: {
        page: "",
        cardWrap: "",
        controlsWrap: "",
      },
    },
  },
  defaultVariants: {
    isFocusMode: false,
  },
});

export { homePageStyle };
