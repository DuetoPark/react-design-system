import React, { HTMLAttributes } from "react";
import classNames from "classnames";

import "./_mask.scss";

export interface MaskPropsType extends HTMLAttributes<HTMLDivElement> {
  /** mask 각도 */
  rotate: "top" | "right" | "bottom" | "left";
}

const Mask: React.FC<MaskPropsType> = ({ rotate, className, ...props }) => {
  return (
    <div
      className={classNames("mask", `mask--${rotate}`, className)}
      {...props}
      aria-hidden
    ></div>
  );
};

export default Mask;
