import { tv } from "tailwind-variants";

const tabStyle = tv({
  base: "flex w-full px-6 py-3",
});

const tabItemStyle = tv({
  base: "flex flex-col items-center justify-center gap-1 px-6 py-1 cursor-pointer rounded-full",

  variants: {
    selected: {
      true: "bg-primary text-white",
      false: "bg-transparent text-primary",
    },
  },
});

export { tabStyle, tabItemStyle };
