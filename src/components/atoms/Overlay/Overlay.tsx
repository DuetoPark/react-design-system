import React from "react";
import classNames from "classnames";

import "./_overlay.scss";

interface OverlayPropsType {
  className?: string;
}

const Overlay: React.FC<OverlayPropsType> = ({ className }) => {
  return (
    <div className={classNames("overlay", className)} aria-hidden={true}></div>
  );
};

export default Overlay;
