import { motion } from "framer-motion";
import {
  deckCreateSheetPanelMotion,
  deckCreateSheetTransition,
} from "../model/animate";
import deckStyle from "../style";

interface DeckCreateSheetPanelProps {
  name: string;
  isSubmitDisabled: boolean;
  onNameChange: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
}

interface DeckCreateSheetActionsProps {
  isSubmitDisabled: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const MAX_DECK_NAME_LENGTH = 20;

const DeckCreateSheetActions = ({
  isSubmitDisabled,
  onClose,
  onCreate,
}: DeckCreateSheetActionsProps) => {
  const { sheetActionRow, sheetButton, sheetButtonPrimary } = deckStyle();

  return (
    <div className={sheetActionRow()}>
      <button type="button" className={sheetButton()} onClick={onClose}>
        취소
      </button>
      <button
        type="button"
        className={sheetButtonPrimary()}
        disabled={isSubmitDisabled}
        onClick={onCreate}
      >
        생성
      </button>
    </div>
  );
};

const DeckCreateSheetPanel = ({
  name,
  isSubmitDisabled,
  onNameChange,
  onClose,
  onCreate,
}: DeckCreateSheetPanelProps) => {
  const { sheetDescription, sheetInput, sheetPanel, sheetTitle } = deckStyle();

  return (
    <motion.section
      className={sheetPanel()}
      initial={deckCreateSheetPanelMotion.initial}
      animate={deckCreateSheetPanelMotion.animate}
      exit={deckCreateSheetPanelMotion.exit}
      transition={deckCreateSheetTransition}
    >
      <h3 className={sheetTitle()}>커스텀 덱 만들기</h3>
      <p className={sheetDescription()}>덱 이름을 입력하면 바로 생성됩니다.</p>
      <input
        type="text"
        className={sheetInput()}
        value={name}
        maxLength={MAX_DECK_NAME_LENGTH}
        placeholder="예: 봄 데일리"
        onChange={(event) => {
          onNameChange(event.target.value);
        }}
      />
      <DeckCreateSheetActions
        isSubmitDisabled={isSubmitDisabled}
        onClose={onClose}
        onCreate={onCreate}
      />
    </motion.section>
  );
};

export default DeckCreateSheetPanel;
