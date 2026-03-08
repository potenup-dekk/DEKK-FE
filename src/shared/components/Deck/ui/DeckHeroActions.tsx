import { LayersPlus, Trash2, X } from "lucide-react";
import deckStyle from "../style";

interface DeckHeroActionsProps {
  onClose: () => void;
  onDeleteCard: () => void;
  onOpenCreateDeckSheet: () => void;
}

const DeckHeroActions = ({
  onClose,
  onDeleteCard,
  onOpenCreateDeckSheet,
}: DeckHeroActionsProps) => {
  const { heroActionButton, heroActions } = deckStyle();

  return (
    <div className={heroActions()}>
      <button type="button" className={heroActionButton()} onClick={onClose}>
        <X size={20} />
      </button>
      <button
        type="button"
        className={heroActionButton()}
        onClick={onDeleteCard}
      >
        <Trash2 size={20} />
      </button>
      <button
        type="button"
        className={heroActionButton()}
        onClick={onOpenCreateDeckSheet}
      >
        <LayersPlus size={20} />
      </button>
    </div>
  );
};

export default DeckHeroActions;
