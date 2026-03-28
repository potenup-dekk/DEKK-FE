import deckStyle from "../style";

interface DeckCreateSheetStatusProps {
  statusMessage: string | null;
  errorMessage: string | null;
}

const DeckCreateSheetStatus = ({
  statusMessage,
  errorMessage,
}: DeckCreateSheetStatusProps) => {
  const { sheetErrorText, sheetStatusText } = deckStyle();

  return (
    <>
      {statusMessage ? <p className={sheetStatusText()}>{statusMessage}</p> : null}
      {errorMessage ? <p className={sheetErrorText()}>{errorMessage}</p> : null}
    </>
  );
};

export default DeckCreateSheetStatus;
