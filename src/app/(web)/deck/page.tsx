import { Deck, DeckCard } from "@/shared/components/Deck";

const DeckPage = () => {
  return (
    <div className="grid grid-cols-3 max-w-md items-center justify-center">
      <Deck />
      <Deck />
    </div>
  );
};

export default DeckPage;
