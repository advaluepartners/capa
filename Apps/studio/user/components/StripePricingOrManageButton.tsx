import { StripePricingModal } from "components/braincomponents/Stripe";
import QuivrButton from "components/braincomponents/ui/QuivrButton/QuivrButton";
import { useUserData } from "hooks/brainhooks/useUserData";

const MANAGE_PLAN_URL = process.env.NEXT_PUBLIC_STRIPE_MANAGE_PLAN_URL;

export const StripePricingOrManageButton = (): JSX.Element => {
  const { userData } = useUserData();

  const is_premium = userData?.is_premium ?? false;
  if (is_premium) {
    return (
      <a href={MANAGE_PLAN_URL} target="_blank" rel="noopener">
        <QuivrButton
          label="Manage my plan"
          color="gold"
          iconName="star"
        ></QuivrButton>
      </a>
    );
  }

  return (
    <StripePricingModal
      Trigger={
        <div>
          <QuivrButton
            label="Upgrade my plan"
            color="gold"
            iconName="star"
          ></QuivrButton>
        </div>
      }
    />
  );
};
