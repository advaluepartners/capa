/* eslint max-lines:["error", 150] */

import { Controller } from "react-hook-form";

import { FieldHeader } from "components/braincomponents/ui/FieldHeader/FieldHeader";
import { TextAreaInput } from "components/braincomponents/ui/TextAreaInput/TextAreaInput";
import { TextInput } from "components/braincomponents/ui/TextInput/TextInput";

import styles from "./GeneralInformation.module.scss";

type GeneralInformationProps = {
  hasEditRights: boolean;
};

export const GeneralInformation = (
  props: GeneralInformationProps
): JSX.Element => {
  const { hasEditRights } = props;

  return (
    <>
      <div className={styles.general_info_wrapper}>
        <div className={styles.name_field_wrapper}>
          <FieldHeader label="Name" iconName="brain" />
          <Controller
            name="name"
            defaultValue=""
            render={({ field }) => (
              <TextInput
                label="Name"
                inputValue={field.value as string}
                setInputValue={field.onChange}
                disabled={!hasEditRights}
              />
            )}
          />
        </div>

        <div className={styles.field_wrapper}>
          <FieldHeader label="Description" iconName="paragraph" />
          <Controller
            name="description"
            defaultValue=""
            render={({ field }) => (
              <TextAreaInput
                label="Description"
                inputValue={field.value as string}
                setInputValue={field.onChange}
                disabled={!hasEditRights}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};
