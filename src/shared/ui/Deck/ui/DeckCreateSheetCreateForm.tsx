import deckStyle from "../style";
import DeckCreateSheetActions from "./DeckCreateSheetActions";

interface DeckCreateSheetCreateFormProps {
  name: string;
  isCreateDisabled: boolean;
  isSaving: boolean;
  isCreating: boolean;
  onNameChange: (value: string) => void;
  onClose: () => void;
  onCreateAndSave: () => void;
}

const MAX_DECK_NAME_LENGTH = 15;

const DeckCreateSheetCreateForm = ({
  name,
  isCreateDisabled,
  isSaving,
  isCreating,
  onNameChange,
  onClose,
  onCreateAndSave,
}: DeckCreateSheetCreateFormProps) => {
  const { sheetInput } = deckStyle();

  return (
    <>
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
        isCreateDisabled={isCreateDisabled}
        isCreating={isCreating}
        isSaving={isSaving}
        onClose={onClose}
        onCreateAndSave={onCreateAndSave}
      />
    </>
  );
};

export default DeckCreateSheetCreateForm;
