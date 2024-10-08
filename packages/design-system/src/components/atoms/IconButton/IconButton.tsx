import React, { ButtonHTMLAttributes } from "react";
import { Button as PrimitiveButton } from "@radix-ui/themes";
import classNames from "classnames";

import "./_iconButton.scss";

import Icon, { IconName } from "../Icon/Icon";
import PushBadge from "../PushBadge";

export type IconButtonVariant = "solid" | "outlined" | "background" | "normal";
export type IconButtonSize = "normal" | "small" | number;

export interface IconButtonStyleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** 버튼 용도 */
  label: string;
  /** 버튼 종류 */
  variant?: IconButtonVariant;
  /** 버튼 크기 */
  size?: IconButtonSize;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 버튼 클릭 리스너 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 아이콘 */
  icon: IconName;
  /** 버튼 푸시 */
  push?: boolean;
}

const BUTTON_PADDING = 8 * 2;
const ICON_SIZE_DEFAULT = 20;
const ICON_SIZE_MAX = 24;

const getIconSize = (buttonSize: IconButtonSize) => {
  if (typeof buttonSize === "string") {
    return buttonSize === "normal" ? ICON_SIZE_DEFAULT : 18;
  }

  return buttonSize > ICON_SIZE_MAX
    ? ICON_SIZE_MAX
    : buttonSize - BUTTON_PADDING;
};

const IconButton: React.FC<IconButtonStyleProps> = ({
  label,
  variant = "normal",
  size = "normal",
  icon,
  push,
  className,
  disabled,
  onClick,
  ...props
}) => {
  const customSize =
    typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : {};
  const sizeClass = typeof size === "string" ? `icon-button--${size}` : "";
  const iconSize = { size: getIconSize(size) };

  return (
    <PrimitiveButton
      className={classNames(
        "icon-button",
        `icon-button--${variant}`,
        sizeClass,
        className
      )}
      onClick={onClick}
      style={{ ...customSize }}
      disabled={disabled}
      {...props}
    >
      <Icon
        className="icon-button--icon"
        icon={icon}
        label={label}
        {...iconSize}
      />
      {push && <PushBadge className="icon-button--push" />}
      <span className="icon-button--interaction" aria-hidden></span>
    </PrimitiveButton>
  );
};

export default IconButton;
