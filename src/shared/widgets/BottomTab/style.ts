import { tv } from "tailwind-variants";

const bottomTabStyle = tv({
  slots: {
    root: "fixed inset-x-0 bottom-0 z-30 flex justify-center",
    inner: "w-full max-w-md rounded-t-xl bg-white",
  },
});

export { bottomTabStyle };
