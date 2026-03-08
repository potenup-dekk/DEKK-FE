import { tv } from "tailwind-variants";

const profileClientStyle = tv({
  slots: {
    form: "flex flex-col gap-4 max-w-md w-full px-4 pt-6 pb-28",
    title: "text-base font-semibold",
    errorText: "text-xs text-red-500",
    emailText: "text-xs text-[#737373]",
    hintText: "text-xs text-[#737373]",
  },
});

export { profileClientStyle };
