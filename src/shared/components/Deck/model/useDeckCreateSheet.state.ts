import { useState } from "react";
import type { CustomDeckData } from "@/entities/deck";

const useDeckCreateSheetState = () => {
  const [name, setName] = useState("");
  const [customDecks, setCustomDecks] = useState<CustomDeckData[]>([]);
  const [isDecksLoading, setIsDecksLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return {
    name,
    setName,
    customDecks,
    setCustomDecks,
    isDecksLoading,
    setIsDecksLoading,
    isSaving,
    setIsSaving,
    isCreating,
    setIsCreating,
    statusMessage,
    setStatusMessage,
    errorMessage,
    setErrorMessage,
  };
};

export default useDeckCreateSheetState;
