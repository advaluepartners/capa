import Icon from "components/braincomponents/ui/Icon/Icon";
import Tooltip from "components/braincomponents/ui/Tooltip/Tooltip";
import { IconSize } from "types/braintypes/Icons";

type ThoughtsButtonProps = {
  text: string;
  size: IconSize;
};

export const ThoughtsButton = ({
  text,
  size,
}: ThoughtsButtonProps): JSX.Element => {
  return (
    <Tooltip tooltip={`How did I get here?\n\n${text}`}>
      <div>
        <Icon name="eureka" size={size} color="black" handleHover={true} />
      </div>
    </Tooltip>
  );
};
