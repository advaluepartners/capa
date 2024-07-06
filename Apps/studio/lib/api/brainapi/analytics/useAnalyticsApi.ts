import { useAxios } from "hooks/brainhooks";

import { getBrainsUsages } from "./analytics";
import { Range } from "./types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAnalytics = () => {
  const { axiosInstance } = useAxios();

  return {
    getBrainsUsages: async (brain_id: string | null, graph_range: Range) =>
      getBrainsUsages(axiosInstance, brain_id, graph_range),
  };
};
