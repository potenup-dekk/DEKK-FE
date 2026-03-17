"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { GuestSharedDeckCardData } from "@/entities/deck";
import { joinSharedDeckAction } from "@/shared/api/actions";
import { useAuthGuard } from "@/shared/hooks";
import {
  deckHeroBackdropMotion,
  deckSelectionOverlayTransition,
} from "@/shared/components/Deck/model/animate";
import DeckCardList from "@/shared/components/Deck/ui/DeckCardList";
import DeckHeroCard from "@/shared/components/Deck/ui/DeckHeroCard";
import DeckSelectionOverlay from "@/shared/components/Deck/ui/DeckSelectionOverlay";
import useDeckHeroGesture from "@/shared/components/Deck/model/useDeckHeroGesture";
import type { DeckCardItem } from "@/shared/components/Deck/model/deckState.helpers";
import { resolveCdnImageUrl } from "@/shared/components/Deck/model/deckState.images";
import deckStyle from "@/shared/components/Deck/style";
import sharedDeckPageStyle from "../style";

interface SharedDeckPageViewProps {
  token: string;
  title: string;
  description: string;
  cards: GuestSharedDeckCardData[];
}

const SharedDeckPageView = ({
  token,
  title,
  description,
  cards,
}: SharedDeckPageViewProps) => {
  const { emptyText, heroCloseAction, heroOverlay, heroOverlayContent } =
    sharedDeckPageStyle();
  const {
    backdrop,
    closeButton,
    heroBackdrop,
    heroActionButton,
    openContent,
    openDescription,
    openHeaderActions,
    openHeader,
    openLayer,
    selectionOverlayTint,
    openTitle,
  } = deckStyle();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthGuard();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isHeroFlipped, setIsHeroFlipped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [isJoinPending, setIsJoinPending] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const deckCards = useMemo<DeckCardItem[]>(() => {
    return cards.map((card, index) => {
      return {
        id: card.cardId,
        cardId: card.cardId,
        name: `공유 카드 ${index + 1}`,
        imageSrc: resolveCdnImageUrl(card.cardImageUrl),
        height: card.height,
        weight: card.weight,
        tags: card.tags,
        products: [],
      };
    });
  }, [cards]);

  const selectedCard = useMemo(() => {
    return deckCards.find((card) => card.id === selectedCardId) ?? null;
  }, [deckCards, selectedCardId]);

  const closeHero = () => {
    setSelectedCardId(null);
    setIsHeroFlipped(false);
  };

  const handleClosePage = () => {
    router.back();
  };

  const handleJoinSharedDeck = async () => {
    if (isLoading || isJoinPending) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    setJoinError(null);
    setIsJoinPending(true);

    try {
      await joinSharedDeckAction(token);
      router.replace("/deck");
    } catch (error) {
      setJoinError(
        error instanceof Error ? error.message : "쉐어덱 참여에 실패했습니다.",
      );
    } finally {
      setIsJoinPending(false);
    }
  };

  const { onDragEnd, onTap, x, y } = useDeckHeroGesture({
    onSwipeClose: closeHero,
    onTapFlip: () => {
      setIsHeroFlipped((previous) => !previous);
    },
  });

  const modalContent = (
    <>
      <div className={backdrop()} />

      <section className={openLayer()}>
        <div className={`${openContent()} relative z-10`}>
          <header className={openHeader()}>
            <div>
              <h1 className={openTitle()}>{title}</h1>
              <p className={openDescription()}>{description}</p>
              {joinError ? (
                <p className="mt-1 text-xs text-rose-300">{joinError}</p>
              ) : null}
            </div>

            <div className={openHeaderActions()}>
              <button
                type="button"
                className={closeButton()}
                aria-label="쉐어덱 참여"
                onClick={() => {
                  void handleJoinSharedDeck();
                }}
                disabled={isJoinPending}
              >
                <Plus size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                className={closeButton()}
                aria-label="공유 덱 닫기"
                onClick={handleClosePage}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
          </header>

          {deckCards.length === 0 ? (
            <p className={emptyText()}>공유된 카드가 없습니다.</p>
          ) : (
            <DeckCardList
              cards={deckCards}
              hiddenCardId={selectedCardId}
              radialOrigin={{ x: 0, y: 0 }}
              isClosing={false}
              shouldStagger={false}
              isLoading={false}
              errorMessage={null}
              onRetry={() => {}}
              onSelectCard={(cardId) => {
                setSelectedCardId(cardId);
                setIsHeroFlipped(false);
              }}
            />
          )}
        </div>

        <DeckSelectionOverlay
          isVisible={Boolean(selectedCard)}
          tintClassName={selectionOverlayTint()}
          zIndexClassName="z-40"
        />

        <AnimatePresence>
          {selectedCard ? (
            <>
              <motion.div
                className={heroBackdrop()}
                initial={deckHeroBackdropMotion.initial}
                animate={deckHeroBackdropMotion.animate}
                exit={deckHeroBackdropMotion.exit}
                transition={deckSelectionOverlayTransition}
              />

              <motion.section
                className={heroOverlay()}
                initial={deckHeroBackdropMotion.initial}
                animate={deckHeroBackdropMotion.animate}
                exit={deckHeroBackdropMotion.exit}
                transition={deckSelectionOverlayTransition}
              >
                <div className={heroOverlayContent()}>
                  <div className={heroCloseAction()}>
                    <button
                      type="button"
                      className={heroActionButton()}
                      onClick={closeHero}
                      aria-label="공유 카드 상세 닫기"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <DeckHeroCard
                    card={selectedCard}
                    isFlipped={isHeroFlipped}
                    gestureBindings={{ x, y, onDragEnd, onTap }}
                  />
                </div>
              </motion.section>
            </>
          ) : null}
        </AnimatePresence>
      </section>
    </>
  );

  if (!isMounted) {
    return null;
  }

  return createPortal(modalContent, document.body);
};

export default SharedDeckPageView;
