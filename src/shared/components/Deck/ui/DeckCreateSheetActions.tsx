import deckStyle from "../style";

interface DeckCreateSheetActionsProps {
  isCreateDisabled: boolean;
  isCreating: boolean;
  isSaving: boolean;
  onClose: () => void;
  onCreateAndSave: () => void;
}

const DeckCreateSheetActions = ({
  isCreateDisabled,
  isCreating,
  isSaving,
  onClose,
  onCreateAndSave,
}: DeckCreateSheetActionsProps) => {
  const { sheetActionRow, sheetButton, sheetButtonPrimary } = deckStyle();
  const isBusy = isCreating || isSaving;

  return (
    <div className={sheetActionRow()}>
      <button type="button" className={sheetButton()} onClick={onClose} disabled={isBusy}>
        취소
      </button>
      <button
        type="button"
        className={sheetButtonPrimary()}
        disabled={isCreateDisabled || isBusy}
        onClick={onCreateAndSave}
      >
        {isCreating ? "생성 중..." : "생성 후 저장"}
      </button>
    </div>
  );
};

export default DeckCreateSheetActions;
