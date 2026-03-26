import { useEffect } from "react";
import { getDecks } from "@/shared/api/services";
import { mapDeckSummaries } from "./deckState.helpers";
import useDeckStateStore from "./useDeckState.store";

const useDeckInitialization = (
  setDecks: ReturnType<typeof useDeckStateStore>["setDecks"],
  clearCloseTimeout: () => void,
) => {
  useEffect(() => {
    const loadDeckSummaries = async () => {
      try {
        const response = await getDecks();
        const deckSummaries = response.data ?? [];

        if (!deckSummaries.length) {
          return;
        }

        setDecks(mapDeckSummaries(deckSummaries));
      } catch {
        return;
      }
    };

    void loadDeckSummaries();
  }, [setDecks]);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);
};

export default useDeckInitialization;
