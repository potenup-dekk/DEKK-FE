"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  deckCreateSheetBackdropMotion,
  deckCreateSheetPanelMotion,
  deckCreateSheetTransition,
} from "../model/animate";
import deckStyle from "../style";

interface DeckBottomSheetProps {
  isOpen: boolean;
  title: string;
  description?: string;
  closeAriaLabel?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const DeckBottomSheet = ({
  isOpen,
  title,
  description,
  closeAriaLabel = "바텀시트 닫기",
  onClose,
  children,
}: DeckBottomSheetProps) => {
  const { sheetBackdrop, sheetDescription, sheetPanel, sheetTitle } =
    deckStyle();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className={sheetBackdrop()}
            initial={deckCreateSheetBackdropMotion.initial}
            animate={deckCreateSheetBackdropMotion.animate}
            exit={deckCreateSheetBackdropMotion.exit}
            onClick={onClose}
            aria-label={closeAriaLabel}
          />

          <motion.section
            className={sheetPanel()}
            initial={deckCreateSheetPanelMotion.initial}
            animate={deckCreateSheetPanelMotion.animate}
            exit={deckCreateSheetPanelMotion.exit}
            transition={deckCreateSheetTransition}
          >
            <h3 className={sheetTitle()}>{title}</h3>
            {description ? (
              <p className={sheetDescription()}>{description}</p>
            ) : null}
            {children}
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DeckBottomSheet;
