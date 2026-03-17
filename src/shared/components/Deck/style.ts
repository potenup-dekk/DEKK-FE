import { tv } from "tailwind-variants";

const deckStyle = tv({
  slots: {
    root: "relative mx-auto w-full max-w-md p-4",
    deckGrid: "mx-auto grid w-fit grid-cols-3 gap-6",
    coverButton:
      "group flex w-22.5 flex-col items-center gap-1 overflow-visible bg-transparent text-center transition-transform hover:scale-[1.02]",
    coverStack: "relative h-33.75 w-22.5",
    emptyCoverStack:
      "h-full w-full rounded-lg border border-dashed border-primary/40 bg-transparent",
    previewImageBase:
      "absolute left-1/2 top-0 aspect-1/1.5 -translate-x-1/2 overflow-hidden rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.25)]",
    previewImage: "h-full w-full object-cover",
    coverTitle:
      "text-center text-[11px] font-normal leading-[1.2] text-primary",
    coverMeta: "text-center text-[10px] leading-[1.2] text-zinc-500",
    sharedDeckBadge:
      "pointer-events-none absolute right-0 top-0 z-35 inline-flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-neutral-700 text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]",
    sharedDeckBadgeIcon: "h-3.5 w-3.5",
    systemBadge:
      "inline-flex items-center rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2 py-0.5 text-[11px] font-medium text-emerald-100",
    openLayer: "fixed inset-0 z-50 overflow-y-auto px-4 pb-3 pt-12",
    openContent: "mx-auto w-full max-w-md",
    openHeader: "sticky mb-5 flex w-full items-end justify-between",
    openHeaderActions: "self-end flex items-center gap-2",
    openTitle: "text-lg font-semibold text-white",
    openDescription: "text-xs text-zinc-300",
    openEditButton:
      "rounded-full border border-white/25 bg-black/40 p-2 text-white transition-colors hover:bg-black/60",
    closeButton:
      "rounded-full border border-white/25 bg-black/40 p-2 text-white transition-colors hover:bg-black/60",
    cardGrid: "mx-auto grid w-fit grid-cols-3 gap-3 pb-3",
    selectionOverlayTint: "bg-black/45",
    cardButton:
      "group relative block w-22.5 aspect-1/1.5 overflow-hidden rounded-lg bg-zinc-900",
    cardImage: "h-full w-full object-cover",
    cardName: "hidden",
    emptyMessage:
      "col-span-full flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/30 bg-black/30 p-10 text-center text-sm text-zinc-300",
    statusRetryButton:
      "rounded-lg border border-white/25 bg-black/30 px-4 py-2 text-xs text-white transition-colors hover:bg-black/50",
    backdrop: "fixed inset-0 z-40 bg-black/45 backdrop-blur-sm",
    heroBackdrop: "fixed inset-0 z-60 bg-black/45 backdrop-blur-md",
    heroContainer:
      "fixed inset-0 z-60 flex flex-col items-center justify-center px-4 pb-10 pt-20",
    heroCardFrame:
      "relative w-5/6 max-w-md aspect-1/1.5 cursor-grab perspective-[1000px]",
    heroInner: "relative aspect-1/1.5 w-full transform-3d",
    heroFace:
      "absolute inset-0 overflow-hidden rounded-lg bg-gray-200 shadow-2xl",
    heroBack:
      "absolute inset-0 rounded-lg bg-white p-5 text-sm text-white backface-hidden transform-[rotateY(180deg)]",
    heroBackContent: "flex h-full min-h-0 flex-col justify-between gap-4",
    heroProductsScroll: "min-h-0 flex-1 overflow-y-auto",
    heroFallbackText: "m-auto text-sm text-zinc-200",
    heroImage: "h-full w-full object-cover",
    heroCardName:
      "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 py-4 text-sm font-semibold text-white",
    heroTagList: "flex flex-wrap gap-1",
    heroHint: "hidden",
    heroActions: "mt-5 flex items-center gap-3",
    heroActionButton:
      "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white transition-colors hover:bg-black/65",
    sheetBackdrop: "fixed inset-0 z-70 bg-black/30 backdrop-blur-sm",
    sheetPanel:
      "fixed inset-x-0 bottom-0 z-71 mx-auto w-full max-w-xl translate-y-3 rounded-t-3xl border border-zinc-200 bg-white p-6 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]",
    sheetTitle: "text-base font-semibold text-zinc-900",
    sheetDescription: "mt-1 text-sm text-zinc-600",
    sheetSectionTitle: "mt-4 text-xs font-semibold text-zinc-500",
    sheetDeckList: "mt-2 flex max-h-50 flex-col gap-2 overflow-y-auto pr-1",
    sheetDeckItem:
      "flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-zinc-900 transition-colors hover:bg-zinc-100 disabled:opacity-60",
    sheetToggleRow:
      "mt-4 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3",
    sheetToggleLabel: "text-sm font-medium text-zinc-900",
    sheetToggleButton:
      "relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50",
    sheetToggleButtonOn: "border-primary bg-primary",
    sheetToggleButtonOff: "border-zinc-300 bg-zinc-200",
    sheetToggleThumb:
      "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
    sheetToggleThumbOn: "translate-x-6",
    sheetToggleThumbOff: "translate-x-1",
    sheetDeckName: "text-sm font-medium text-zinc-900",
    sheetDeckMeta: "text-xs text-zinc-500",
    sheetInput:
      "mt-4 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-400 focus:outline-none",
    sheetErrorText: "mt-2 text-xs text-rose-400",
    sheetStatusText: "mt-2 text-xs text-zinc-500",
    sheetActionRow: "mt-5 flex items-center justify-end gap-2",
    sheetActionRowBetween: "mt-5 flex items-center justify-between gap-2",
    sheetButton:
      "rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 transition-colors hover:bg-zinc-100",
    sheetDangerButton:
      "rounded-lg border border-error bg-error px-4 py-2 text-sm text-white transition-colors hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-50",
    sheetButtonPrimary:
      "rounded-lg border border-primary bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
  },
});

export default deckStyle;
