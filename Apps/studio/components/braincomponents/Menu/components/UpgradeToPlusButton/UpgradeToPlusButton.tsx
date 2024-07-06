import { useTranslation } from "react-i18next";

import { MenuButton } from "components/braincomponents/Menu/components/MenuButton/MenuButton";
import { StripePricingModal } from "components/braincomponents/Stripe";
import { useUserData } from "hooks/brainhooks/useUserData";

export const UpgradeToPlusButton = (): JSX.Element => {
  const { userData } = useUserData();
  const is_premium = userData?.is_premium;
  const { t } = useTranslation("monetization");

  if (is_premium === true) {
    return <></>;
  }

  return (
    <StripePricingModal
      Trigger={
        <MenuButton
          iconName="star"
          label={t("upgrade")}
          type="add"
          color="gold"
        />
      }
    />
  );
};
