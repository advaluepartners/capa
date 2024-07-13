import { UUID } from "crypto";

import { SelectOptionProps } from "components/braincomponents/ui/Select";
import { MinimalBrainForUser } from "lib/context/BrainProvider/types";

export const formatMinimalBrainsToSelectComponentInput = (
  brains: MinimalBrainForUser[]
): SelectOptionProps<UUID>[] =>
  brains.map((brain) => ({
    label: brain.name,
    value: brain.id,
  }));
