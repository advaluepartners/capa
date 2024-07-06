import { Color } from "types/braintypes/Colors";
import { IconSize } from "types/braintypes/Icons";

import styles from "./LoaderIcon.module.scss";

import { Icon } from "../Icon/Icon";

interface LoaderIconProps {
  size: IconSize;
  color: Color;
}

export const LoaderIcon = (props: LoaderIconProps): JSX.Element => {
  return (
    <Icon
      name="loader"
      size={props.size}
      color={props.color}
      classname={styles.loader_icon ?? ""}
    />
  );
};
