import { useCallback, useState } from "react";

const useHomeCustomDeckSheet = () => {
  const [isCustomDeckSheetOpen, setIsCustomDeckSheetOpen] = useState(false);
  const [customDeckTargetCardId, setCustomDeckTargetCardId] = useState<
    number | null
  >(null);

  const openCustomDeckSheet = useCallback((cardId: number) => {
    setCustomDeckTargetCardId(cardId);
    setIsCustomDeckSheetOpen(true);
  }, []);

  const closeCustomDeckSheet = useCallback(() => {
    setIsCustomDeckSheetOpen(false);
  }, []);

  return {
    isCustomDeckSheetOpen,
    customDeckTargetCardId,
    openCustomDeckSheet,
    closeCustomDeckSheet,
  };
};

export default useHomeCustomDeckSheet;
