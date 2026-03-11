import { tv } from "tailwind-variants";

const selectTabStyle = tv({
  slots: {
    root: "flex flex-col gap-4",
    selectContainer:
      "relative isolate w-full rounded-md border border-primary/30 bg-primary/10 p-1",
    selectIndicator: "absolute left-1 top-1 bottom-1 rounded-md bg-primary",
    selectItems: "relative z-10 flex w-full",
    sectionContainer: "w-full",
  },
});

const selectItemStyle = tv({
  base: "h-9 flex-1 rounded-md text-sm font-medium transition-colors duration-200",
  variants: {
    selected: {
      true: "text-white",
      false: "text-primary",
    },
  },
});

export { selectItemStyle, selectTabStyle };
