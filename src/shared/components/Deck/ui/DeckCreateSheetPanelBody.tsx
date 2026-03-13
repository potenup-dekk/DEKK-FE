import type { CustomDeckData } from "@/entities/deck";
import DeckCreateSheetCreateForm from "./DeckCreateSheetCreateForm";
import DeckCreateSheetDeckList from "./DeckCreateSheetDeckList";
import DeckCreateSheetStatus from "./DeckCreateSheetStatus";

interface DeckCreateSheetPanelBodyProps {
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

const DeckCreateSheetPanelBody = ({
  customDecks,
  isDecksLoading,
  statusMessage,
  errorMessage,
  name,
  isCreateDisabled,
  isSaving,
  isCreating,
  onDeckSelect,
  onNameChange,
  onClose,
  onCreateAndSave,
}: DeckCreateSheetPanelBodyProps) => {
  const isBusy = isSaving || isCreating;

  return (
    <>
      <DeckCreateSheetDeckList
        customDecks={customDecks}
        isDecksLoading={isDecksLoading}
        isBusy={isBusy}
        onDeckSelect={onDeckSelect}
      />
      <DeckCreateSheetStatus
        statusMessage={statusMessage}
        errorMessage={errorMessage}
      />
      <DeckCreateSheetCreateForm
        name={name}
        isCreateDisabled={isCreateDisabled}
        isCreating={isCreating}
        isSaving={isSaving}
        onNameChange={onNameChange}
        onClose={onClose}
        onCreateAndSave={onCreateAndSave}
      />
    </>
  );
};

export default DeckCreateSheetPanelBody;
