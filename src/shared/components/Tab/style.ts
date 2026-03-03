import { tv } from "tailwind-variants";

const tabStyle = tv({
  base: "flex w-full px-6 py-3",
});

const tabItemStyle = tv({
  base: "relative flex flex-1 flex-col items-center justify-center gap-1 px-6 py-1 cursor-pointer rounded-full",

  variants: {
    selected: {
      true: "text-white",
      false: "bg-transparent text-primary",
    },
  },
});

export { tabStyle, tabItemStyle };
