"use client";

import { AnimatePresence, motion } from "framer-motion";
import { deckCreateSheetBackdropMotion } from "../model/animate";
import useDeckCreateSheet from "../model/useDeckCreateSheet";
import deckStyle from "../style";
import DeckCreateSheetPanel from "./DeckCreateSheetPanel";

interface DeckCreateSheetProps {
  isOpen: boolean;
  targetCardId?: number | null;
  onClose: () => void;
  onSaved?: () => void;
}

const toDeckCreateSheetPanelProps = (
  sheetState: ReturnType<typeof useDeckCreateSheet>,
) => {
  return {
    customDecks: sheetState.customDecks,
    isDecksLoading: sheetState.isDecksLoading,
    statusMessage: sheetState.statusMessage,
    errorMessage: sheetState.errorMessage,
    name: sheetState.name,
    isCreateDisabled: sheetState.isCreateDisabled,
    isSaving: sheetState.isSaving,
    isCreating: sheetState.isCreating,
    onDeckSelect: (deckId: number) => {
      void sheetState.saveToCustomDeck(deckId);
    },
    onNameChange: sheetState.setName,
    onClose: sheetState.resetAndClose,
    onCreateAndSave: () => {
      void sheetState.createAndSave();
    },
  };
};

const DeckCreateSheet = ({
  isOpen,
  targetCardId = null,
  onClose,
  onSaved,
}: DeckCreateSheetProps) => {
  const { sheetBackdrop } = deckStyle();
  const sheetState = useDeckCreateSheet({
    isOpen,
    targetCardId,
    onClose,
    onSaved,
  });
  const panelProps = toDeckCreateSheetPanelProps(sheetState);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className={sheetBackdrop()}
            initial={deckCreateSheetBackdropMotion.initial}
            animate={deckCreateSheetBackdropMotion.animate}
            exit={deckCreateSheetBackdropMotion.exit}
            onClick={sheetState.resetAndClose}
          />
          <DeckCreateSheetPanel {...panelProps} />
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DeckCreateSheet;
