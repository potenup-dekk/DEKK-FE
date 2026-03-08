"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { deckCreateSheetBackdropMotion } from "../model/animate";
import deckStyle from "../style";
import DeckCreateSheetPanel from "./DeckCreateSheetPanel";

interface DeckCreateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => boolean;
}

const DeckCreateSheet = ({
  isOpen,
  onClose,
  onCreate,
}: DeckCreateSheetProps) => {
  const { sheetBackdrop } = deckStyle();
  const [name, setName] = useState("");

  const isSubmitDisabled = !name.trim();

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleCreate = () => {
    const didCreate = onCreate(name.trim());

    if (didCreate) {
      setName("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className={sheetBackdrop()}
            initial={deckCreateSheetBackdropMotion.initial}
            animate={deckCreateSheetBackdropMotion.animate}
            exit={deckCreateSheetBackdropMotion.exit}
            onClick={handleClose}
          />
          <DeckCreateSheetPanel
            name={name}
            isSubmitDisabled={isSubmitDisabled}
            onNameChange={setName}
            onClose={handleClose}
            onCreate={handleCreate}
          />
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DeckCreateSheet;
