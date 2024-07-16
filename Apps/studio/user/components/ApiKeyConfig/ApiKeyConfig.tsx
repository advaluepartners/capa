/* eslint-disable max-lines */
"use client";

import { useTranslation } from "react-i18next";

import Button from "components/braincomponents/ui/Button";
import { CopyButton } from "components/braincomponents/ui/CopyButton";
import { FieldHeader } from "components/braincomponents/ui/FieldHeader/FieldHeader";

import styles from "./ApiKeyConfig.module.scss";
import { useApiKeyConfig } from "./hooks/useApiKeyConfig";

export const ApiKeyConfig = (): JSX.Element => {
  const { apiKey, handleCopyClick, handleCreateClick } = useApiKeyConfig();
  const { t } = useTranslation(["config"]);

  return (
    <div>
      <FieldHeader iconName="key" label={`Quivr ${t("apiKey")}`} />
      {apiKey === "" ? (
        <Button
          data-testid="create-new-key"
          //variant="secondary"
          onClick={() => void handleCreateClick()}
        >
          Create New Key
        </Button>
      ) : (
        <div className={styles.response_wrapper}>
          <span>{apiKey}</span>
          <CopyButton handleCopy={handleCopyClick} size="small" />
        </div>
      )}
    </div>
  );
};
