import type { CustomDeckData } from "@/entities/deck";
import deckStyle from "../style";
import DeckCreateSheetDeckItem from "./DeckCreateSheetDeckItem";
import DeckCreateSheetDeckListStatus from "./DeckCreateSheetDeckListStatus";

interface DeckCreateSheetDeckListProps {
  customDecks: CustomDeckData[];
  isDecksLoading: boolean;
  isBusy: boolean;
  onDeckSelect: (deckId: number) => void;
}

const DeckCreateSheetDeckList = ({
  customDecks,
  isDecksLoading,
  isBusy,
  onDeckSelect,
}: DeckCreateSheetDeckListProps) => {
  const { sheetDeckList, sheetSectionTitle } = deckStyle();
  const isEmpty = !isDecksLoading && !customDecks.length;

  return (
    <>
      <p className={sheetSectionTitle()}>내 커스텀 덱</p>
      <div className={sheetDeckList()}>
        {customDecks.map((deck) => (
          <DeckCreateSheetDeckItem
            key={deck.deckId}
            deck={deck}
            isBusy={isBusy}
            onDeckSelect={onDeckSelect}
          />
        ))}
        <DeckCreateSheetDeckListStatus
          isDecksLoading={false}
          isEmpty={isEmpty}
        />
      </div>
      <DeckCreateSheetDeckListStatus isDecksLoading={isDecksLoading} isEmpty={false} />
    </>
  );
};

export default DeckCreateSheetDeckList;
