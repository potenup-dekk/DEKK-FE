import { tv } from "tailwind-variants";

const sharedDeckPageStyle = tv({
  slots: {
    page: "mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-24 pt-6 sm:px-6",
    header: "space-y-1",
    listOverlayTint: "bg-black/45",
    listOverlayBackdrop: "bg-black/45 backdrop-blur-sm",
    heroOverlay: "fixed inset-0 z-60 overflow-y-auto px-4 pb-8 pt-8",
    heroOverlayContent:
      "mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center gap-4 py-6",
    heroCloseAction: "sticky top-0 z-10 ml-auto",
    title: "text-xl font-bold text-primary",
    description: "text-xs text-zinc-500",
    cardGrid: "grid grid-cols-2 gap-3",
    cardItem:
      "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm",
    cardImage: "aspect-1/1.5 w-full object-cover",
    cardMeta: "space-y-2 p-3",
    statRow: "flex items-center gap-3 text-[11px] text-zinc-500",
    tagWrap: "flex flex-wrap gap-1.5",
    tag: "rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-600",
    emptyText:
      "rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-xs text-zinc-500",
    errorText:
      "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600",
  },
});

export default sharedDeckPageStyle;
