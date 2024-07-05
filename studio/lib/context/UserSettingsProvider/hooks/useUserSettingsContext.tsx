// import { useContext } from "react";

// import { UserSettingsContext } from "../User-settings.provider";

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const useUserSettingsContext = () => {
//   const context = useContext(UserSettingsContext);
//   if (context === undefined) {
//     throw new Error(
//       "useUserSettingsContext must be used within a UserSettingsProvider"
//     );
//   }

//   return context;
// };

import { useContext } from "react";
import { UserSettingsContext } from "../User-settings.provider";

const defaultContextValue = {
  // Define the default values for your context properties here
  // Example:
  userSetting1: 'defaultValue1',
  userSetting2: 'defaultValue2',
  // Add more default values as needed
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUserSettingsContext = () => {
  const context = useContext(UserSettingsContext) || defaultContextValue;
  
  return context;
};

