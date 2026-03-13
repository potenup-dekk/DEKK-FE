import type { CustomDeckData } from "@/entities/deck";
import deckStyle from "../style";

interface DeckCreateSheetDeckItemProps {
  deck: CustomDeckData;
  isBusy: boolean;
  onDeckSelect: (deckId: number) => void;
}

const DeckCreateSheetDeckItem = ({
  deck,
  isBusy,
  onDeckSelect,
}: DeckCreateSheetDeckItemProps) => {
  const { sheetDeckItem, sheetDeckMeta, sheetDeckName } = deckStyle();

  return (
    <button
      type="button"
      className={sheetDeckItem()}
      disabled={isBusy}
      onClick={() => {
        onDeckSelect(deck.deckId);
      }}
    >
      <span className={sheetDeckName()}>{deck.name}</span>
      <span className={sheetDeckMeta()}>{deck.cardCount}장</span>
    </button>
  );
};

export default DeckCreateSheetDeckItem;
