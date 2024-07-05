// import { useContext } from "react";

// import { BrainContext } from "../brain-provider";
// import { BrainContextType } from "../types";

// export const useBrainContext = (): BrainContextType => {
//   const context = useContext(BrainContext);

//   if (context === undefined) {
//     throw new Error("useBrainContext must be used inside BrainProvider");
//   }

//   return context;
// };

import { useContext } from "react";
import { BrainContext } from "../brain-provider";
import { BrainContextType } from "../types";

const defaultContextValue: BrainContextType = {
  allBrains: [],
  fetchAllBrains: async () => {},
  isFetchingBrains: false,

  currentBrain: null,
  currentBrainDetails: null,
  currentBrainId: null,
  setCurrentBrainId: () => {},

  fetchPublicPrompts: async () => {},
  publicPrompts: [],
  currentPrompt: null,

  setCurrentPromptId: () => {},
  currentPromptId: null,

  createBrain: async () => undefined,

  deleteBrain: async () => {},
};

export const useBrainContext = (): BrainContextType => {
  const context = useContext(BrainContext) || defaultContextValue;

  return context;
};


