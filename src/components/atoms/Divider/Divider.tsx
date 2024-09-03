import React from "react";
import * as Separator from "@radix-ui/react-separator";
import classNames from "classnames";

import "./_divider.scss";

export interface DividerPropsType {
  /** divider 방향 */
  orientation?: "horizontal" | "vertical";
  /** divider 두께 */
  size?: "normal" | "thick";
  /** divider 꾸밈용 */
  decorative?: boolean;
}

const Divider: React.FC<DividerPropsType> = ({
  orientation = "horizontal",
  size = "normal",
  decorative = false,
}) => {
  return (
    <Separator.Root
      className={classNames("divider", `divider--${orientation}-${size}`)}
      orientation={orientation}
      decorative={decorative}
    />
  );
};

export default Divider;
