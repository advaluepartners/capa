import { CompanySize } from "lib/api/brainapi/user/user";

export type OnboardingProps = {
  username: string;
  companyName: string;
  companySize: CompanySize;
  usagePurpose: string;
};
