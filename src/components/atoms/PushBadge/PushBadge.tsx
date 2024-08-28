import React from "react";
import classNames from "classnames";

import "./_pushBadge.scss";

interface PushBadgeProps {
  className?: string;
}

const PushBadge: React.FC<PushBadgeProps> = ({ className }) => {
  return (
    <strong
      className={classNames("push", className)}
      aria-label="신규 알림"
    ></strong>
  );
};

export default PushBadge;
