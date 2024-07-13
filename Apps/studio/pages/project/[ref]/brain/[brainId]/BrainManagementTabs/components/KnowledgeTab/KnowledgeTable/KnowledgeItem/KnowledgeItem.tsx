"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { useKnowledgeApi } from "lib/api/brainapi/knowledge/useKnowledgeApi";
import Icon from "components/braincomponents/ui/Icon/Icon";
import { OptionsModal } from "components/braincomponents/ui/OptionsModal/OptionsModal";
import { getFileIcon } from "lib/helpers/getFileIcon";
import { useUrlBrain } from "hooks/brainhooks/useBrainIdFromUrl";
import { isUploadedKnowledge, Knowledge } from "types/braintypes/Knowledge";
import { Option } from "types/braintypes/Options";

import { useKnowledgeItem } from "./hooks/useKnowledgeItem";
// eslint-disable-next-line import/order
import styles from "./KnowledgeItem.module.scss";

const KnowledgeItem = ({
  knowledge,
}: {
  knowledge: Knowledge;
}): JSX.Element => {
  const [optionsOpened, setOptionsOpened] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { onDeleteKnowledge } = useKnowledgeItem();
  const { brain } = useUrlBrain();
  const { generateSignedUrlKnowledge } = useKnowledgeApi();

  const options: Option[] = [
    {
      label: "Delete",
      onClick: () => void onDeleteKnowledge(knowledge),
      iconName: "delete",
      iconColor: "dangerous",
      disabled: brain?.role !== "Owner",
    },
    {
      label: "Download",
      onClick: () => void downloadFile(),
      iconName: "download",
      iconColor: "primary",
      disabled: brain?.role !== "Owner" || !isUploadedKnowledge(knowledge),
    },
  ];

  const downloadFile = async () => {
    if (isUploadedKnowledge(knowledge)) {
      const download_url = await generateSignedUrlKnowledge({
        knowledgeId: knowledge.id,
      });

      try {
        const response = await axios.get(download_url, {
          responseType: "blob",
        });

        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = knowledge.fileName;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    }
    setOptionsOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        iconRef.current &&
        !iconRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setOptionsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.knowledge_item_wrapper}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {isUploadedKnowledge(knowledge) ? (
            getFileIcon(knowledge.fileName)
          ) : (
            <Icon name="link" size="normal" color="black" />
          )}
        </div>
        {isUploadedKnowledge(knowledge) ? (
          <span className={styles.file_name}>{knowledge.fileName}</span>
        ) : (
          <a href={knowledge.url} target="_blank" rel="noopener noreferrer">
            {knowledge.url}
          </a>
        )}
      </div>
      <div
        ref={iconRef}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.nativeEvent.stopImmediatePropagation();
          setOptionsOpened(!optionsOpened);
        }}
      >
        <Icon name="options" size="normal" color="black" handleHover={true} />
      </div>
      <div ref={optionsRef} className={styles.options_modal}>
        {optionsOpened && <OptionsModal options={options} />}
      </div>
    </div>
  );
};

export default KnowledgeItem;