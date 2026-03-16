import { tv } from "tailwind-variants";

const postPageStyle = tv({
  slots: {
    page: "mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-24 pt-6 sm:px-6",
    title: "text-xl font-bold text-primary",
    description: "text-xs text-zinc-500",
    stepHeader: "grid grid-cols-3 gap-2",
    stepItem: "rounded-lg border px-3 py-2 text-center",
    stepTitle: "text-xs font-semibold",
    stepValue: "mt-1 text-[11px]",
    section: "rounded-xl border border-primary/20 bg-white p-4",
    imageCardButton:
      "relative mx-auto flex aspect-1/1.5 w-5/6 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-primary/40 bg-zinc-50 text-xs text-zinc-500",
    imageCardPreview: "h-full w-full object-cover",
    imageHint: "mt-3 text-center text-xs text-zinc-500",
    categoryMeta: "grid grid-cols-2 gap-3",
    categoryMetaItem: "rounded-lg border border-zinc-200 p-3",
    categoryMetaTitle: "text-xl font-bold",
    categoryMetaValue: "mt-1 text-sm",
    categoryOptionGroup: "mt-4 flex flex-wrap gap-2",
    categoryOptionButton:
      "rounded-full border px-3 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    tagInputRow: "flex items-start gap-2",
    tagInputWrap: "flex-1",
    divider: "my-4 border-t border-zinc-200",
    tagBadgeWrap: "flex flex-wrap gap-2",
    tagBadgeButton:
      "inline-flex items-center gap-1 rounded-full border border-zinc-200 pr-2",
    tagRemoveText: "text-[10px] text-zinc-500",
    errorText: "mt-2 text-xs text-red-500",
    statusText: "mt-2 text-xs text-primary",
    footer: "mt-2 flex items-center justify-between gap-2",
  },
  variants: {
    stepState: {
      active: {
        stepItem: "border-primary/60 bg-primary/10 text-primary",
        stepTitle: "text-primary",
        stepValue: "text-primary/90",
      },
      inactive: {
        stepItem: "border-zinc-200 bg-white text-zinc-400",
        stepTitle: "text-zinc-400",
        stepValue: "text-zinc-400",
      },
    },
    categoryFocus: {
      true: {
        categoryMetaTitle: "text-primary",
        categoryMetaValue: "text-primary",
      },
      false: {
        categoryMetaTitle: "text-zinc-400",
        categoryMetaValue: "text-zinc-400",
      },
    },
    optionSelected: {
      true: {
        categoryOptionButton: "border-primary bg-primary/10 text-primary",
      },
      false: {
        categoryOptionButton:
          "border-zinc-300 bg-white text-zinc-600 hover:border-primary/40",
      },
    },
  },
});

export default postPageStyle;
