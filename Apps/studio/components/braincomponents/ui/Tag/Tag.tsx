import { Color } from "types/braintypes/Colors";

import styles from "./Tag.module.scss";

interface TagProps {
  name: string;
  color: Color;
}

export const Tag = (props: TagProps): JSX.Element => {
  return (
    <div className={`${styles.tag_wrapper} ${styles[props.color]} `}>
      {props.name}
    </div>
  );
};
