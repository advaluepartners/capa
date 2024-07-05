import { useQuery } from "@tanstack/react-query";

import { USER_DATA_KEY, USER_IDENTITY_DATA_KEY } from "lib/api/brainapi/user/config";
import { useUserApi } from "lib/api/brainapi/user/useUserApi";
import { UserIdentity } from "lib/api/brainapi/user/user";
import { UserStats } from "types/braintypes/User";

type UseUserDataProps = {
  userData: UserStats | undefined;
  userIdentityData: UserIdentity | undefined;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUserData = (): UseUserDataProps => {
  const { getUser } = useUserApi();
  const { getUserIdentity } = useUserApi();

  const { data: userData } = useQuery({
    queryKey: [USER_DATA_KEY],
    queryFn: getUser,
  });

  const { data: userIdentityData } = useQuery({
    queryKey: [USER_IDENTITY_DATA_KEY],
    queryFn: getUserIdentity,
  });

  return {
    userData,
    userIdentityData,
  };
};
