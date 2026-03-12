import { motion } from "framer-motion";
import type { CustomDeckData } from "@/entities/deck";
import {
  deckCreateSheetPanelMotion,
  deckCreateSheetTransition,
} from "../model/animate";
import deckStyle from "../style";
import DeckCreateSheetHeader from "./DeckCreateSheetHeader";
import DeckCreateSheetPanelBody from "./DeckCreateSheetPanelBody";

interface DeckCreateSheetPanelProps {
  customDecks: CustomDeckData[];
  isDecksLoading: boolean;
  statusMessage: string | null;
  errorMessage: string | null;
  name: string;
  isCreateDisabled: boolean;
  isSaving: boolean;
  isCreating: boolean;
  onDeckSelect: (deckId: number) => void;
  onNameChange: (value: string) => void;
  onClose: () => void;
  onCreateAndSave: () => void;
}

const DeckCreateSheetPanel = (props: DeckCreateSheetPanelProps) => {
  const { sheetPanel } = deckStyle();
  return (
    <motion.section
      className={sheetPanel()}
      initial={deckCreateSheetPanelMotion.initial}
      animate={deckCreateSheetPanelMotion.animate}
      exit={deckCreateSheetPanelMotion.exit}
      transition={deckCreateSheetTransition}
    >
      <DeckCreateSheetHeader />
      <DeckCreateSheetPanelBody {...props} />
    </motion.section>
  );
};

export default DeckCreateSheetPanel;
