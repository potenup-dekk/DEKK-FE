import { motion, type MotionValue, type PanInfo } from "framer-motion";
import Tag from "@/shared/components/Badge";
import ProductList from "@/shared/components/ProductList";
import {
  deckCardFlipTransition,
  deckHeroCardTransition,
} from "../model/animate";
import type { DeckCardItem } from "../model/deckState.helpers";
import { toDeckCardLayoutId } from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCardImage from "./DeckCardImage";

interface DeckHeroCardGestureBindings {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onDragEnd: (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onTap: () => void;
}

interface DeckHeroCardProps {
  card: DeckCardItem;
  isFlipped: boolean;
  gestureBindings?: DeckHeroCardGestureBindings;
}

interface DeckHeroBackContentProps {
  card: DeckCardItem;
}

const DeckHeroBackContent = ({ card }: DeckHeroBackContentProps) => {
  const { heroBackContent, heroFallbackText, heroProductsScroll, heroTagList } =
    deckStyle();
  const backfaceProducts = card.products ?? [];
  const backfaceTags = card.tags ?? [];
  const hasProducts = backfaceProducts.length > 0;
  const hasTags = backfaceTags.length > 0;

  return (
    <div className={heroBackContent()}>
      <div className={heroProductsScroll()}>
        {hasProducts ? (
          <ProductList items={backfaceProducts} useCdn />
        ) : (
          <p className={heroFallbackText()}>상품 정보가 없습니다.</p>
        )}
      </div>

      {hasTags ? (
        <div className={heroTagList()}>
          {backfaceTags.map((tag, index) => {
            return <Tag key={`${card.id}-${tag}-${index}`} label={tag} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

const DeckHeroCard = ({
  card,
  isFlipped,
  gestureBindings,
}: DeckHeroCardProps) => {
  const { heroBack, heroCardFrame, heroFace, heroImage, heroInner } =
    deckStyle();

  return (
    <motion.div
      className={heroCardFrame()}
      layoutId={toDeckCardLayoutId(card.id)}
      transition={deckHeroCardTransition}
    >
      <motion.div
        className={heroInner()}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={deckCardFlipTransition}
        drag={Boolean(gestureBindings)}
        dragSnapToOrigin
        dragElastic={0.2}
        onDragEnd={gestureBindings?.onDragEnd}
        onTap={gestureBindings?.onTap}
        style={{ x: gestureBindings?.x, y: gestureBindings?.y }}
      >
        <div className={heroFace()}>
          <div className="relative h-full w-full">
            <DeckCardImage
              src={card.imageSrc}
              alt={card.name}
              className={heroImage()}
            />
          </div>
        </div>
        <div className={heroBack()}>
          <DeckHeroBackContent card={card} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeckHeroCard;
