import { tv } from "tailwind-variants";

const controlButtonStyle = tv({
  base: "flex items-center h-fit flex-1 justify-center rounded-xl gap-1 p-3 md:p-4 border border-primary text-xs font-bold cursor-pointer",

  variants: {
    color: {
      primary: "bg-primary text-white",
      secondary: "bg-white text-primary",
    },
  },

  defaultVariants: {
    color: "primary",
  },
});

export default controlButtonStyle;
