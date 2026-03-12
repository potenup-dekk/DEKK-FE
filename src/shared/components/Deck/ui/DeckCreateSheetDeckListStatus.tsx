import deckStyle from "../style";

interface DeckCreateSheetDeckListStatusProps {
  isDecksLoading: boolean;
  isEmpty: boolean;
}

const DeckCreateSheetDeckListStatus = ({
  isDecksLoading,
  isEmpty,
}: DeckCreateSheetDeckListStatusProps) => {
  const { sheetStatusText } = deckStyle();

  if (isDecksLoading) {
    return <p className={sheetStatusText()}>커스텀 덱 목록을 불러오는 중...</p>;
  }

  if (isEmpty) {
    return <p className={sheetStatusText()}>생성된 커스텀 덱이 없습니다.</p>;
  }

  return null;
};

export default DeckCreateSheetDeckListStatus;
