import { tv } from "tailwind-variants";

const homePageStyle = tv({
  slots: {
    page: "flex flex-col h-full w-full items-center justify-center gap-3",
    cardWrap: "flex relative max-w-md w-full items-center justify-center",
    controls: "flex items-center justify-between w-5/6 gap-1",
  },
});

export { homePageStyle };
