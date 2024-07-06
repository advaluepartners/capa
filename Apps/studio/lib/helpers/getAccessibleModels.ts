import { freeModels, paidModels } from "types/braintypes/BrainConfig";
import { UserStats } from "types/braintypes/User";

type GetAccessibleModelsInput = {
  openAiKey?: string | null;
  userData?: UserStats;
};
export const getAccessibleModels = ({
  openAiKey,
  userData,
}: GetAccessibleModelsInput): string[] => {
  if (userData?.models !== undefined) {
    return userData.models;
  }
  if (openAiKey !== undefined && openAiKey !== null) {
    return paidModels as unknown as string[];
  }

  return freeModels as unknown as string[];
};
