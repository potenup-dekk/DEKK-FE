import { tv } from "tailwind-variants";

const productStyle = tv({
  slots: {
    root: "flex h-fit justify-center gap-3",
    image: "size-10 rounded-lg",
    content: "flex flex-col flex-1 justify-between",
    brand: "text-sm font-bold text-black",
    name: "text-[11px] text-black",
  },
});

export { productStyle };
