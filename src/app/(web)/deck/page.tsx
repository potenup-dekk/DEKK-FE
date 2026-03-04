"use client";

import { DeckCard } from "@/shared/components/Deck";
import { AnimatePresence } from "framer-motion";

const DeckPage = () => {
  return (
    <div className="grid grid-cols-3 gap-y-5 w-full max-w-md">
      <AnimatePresence>
        <DeckCard />

        {Array.from({ length: 9 }).map((_, index) => (
          <DeckCard key={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DeckPage;
