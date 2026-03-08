import { tv } from "tailwind-variants";

const headerStyle = tv({
  slots: {
    root: "grid grid-cols-3 justify-between items-center w-full h-16 p-5",
    left: "flex",
    center: "flex items-center justify-center",
    right: "flex items-center justify-end",
  },
});

export { headerStyle };
