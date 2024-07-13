import { useTranslation } from "react-i18next";

import Input from "packages/ui/src/components/Input/Input";

type BrainSearchBarProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export const BrainSearchBar = ({
  searchQuery,
  setSearchQuery,
}: BrainSearchBarProps): JSX.Element => {
  const { t } = useTranslation(["brain"]);

  return (
    <Input
      iconName="search"
      label={t("searchBrain")}
      inputValue={searchQuery}
      setInputValue={setSearchQuery}
    />
  );
};
