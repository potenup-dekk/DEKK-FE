import { tv } from "tailwind-variants";

const profileClientStyle = tv({
  slots: {
    layout: "flex flex-col gap-4 max-w-md w-full px-4 pt-6 pb-28",
    form: "flex flex-col gap-4",
    sectionCard:
      "flex flex-col gap-3 rounded-md border border-primary/20 bg-white p-4",
    sectionTitle: "text-base font-semibold text-primary",
    sectionDescription: "text-xs text-[#737373]",
    title: "text-base font-semibold",
    loading: "p-4 text-sm",
    errorText: "text-xs text-red-500",
    emailText: "text-xs text-[#737373]",
    hintText: "text-xs text-[#737373]",
  },
});

export { profileClientStyle };
