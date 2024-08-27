import React, { SVGProps } from "react";

import "./icon.scss";

import { icons } from "./icons";

const iconSizeMap = {
  tiny: 16,
  small: 20,
  medium: 28,
  large: 32,
  normal: 24,
};

export type IconName = keyof typeof icons;
export type IconSize = keyof typeof iconSizeMap | number;

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 종류 */
  icon: IconName;
  /** 아이콘 크기 */
  size?: IconSize;
  /** 아이콘 레이블 */
  label?: string;
  /** 아이콘 클래스명 */
  className?: string;
}

const getSize = (size: IconSize) => {
  return typeof size === "number" ? size : iconSizeMap[size];
};

const Icon: React.FC<SvgIconProps> = ({
  icon,
  size = "normal",
  label,
  className,
  ...props
}) => {
  const SVGIcon = icons[icon];
  const ariaProps = label //
    ? { "aria-label": label } //
    : { "aria-hidden": true };

  return (
    <i className={`icon ${className || ""}`} {...ariaProps}>
      <SVGIcon width={getSize(size)} height={getSize(size)} {...props} />
    </i>
  );
};

export default Icon;
