import { BrainRoleType } from "@/pages/project/[ref]/brain/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/types";

import { SubscriptionUpdatableProperties } from "../types";

type BackendSubscriptionUpdatableProperties = {
  rights: BrainRoleType | null;
};
export const mapSubscriptionUpdatablePropertiesToBackendSubscriptionUpdatableProperties =
  (
    subscriptionUpdatableProperties: SubscriptionUpdatableProperties
  ): BackendSubscriptionUpdatableProperties => ({
    rights: subscriptionUpdatableProperties.role,
  });
