import deckStyle from "../style";

const DeckCreateSheetHeader = () => {
  const { sheetDescription, sheetTitle } = deckStyle();

  return (
    <>
      <h3 className={sheetTitle()}>커스텀 덱 저장</h3>
      <p className={sheetDescription()}>
        목록에서 고르면 바로 저장되고, 이름을 입력하면 생성 후 저장됩니다.
      </p>
    </>
  );
};

export default DeckCreateSheetHeader;
