import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import classNames from "classnames";

import "./_toggleIconButton.scss";

import { icons } from "../Icon/icons";
import { IconStyleProps } from "../Icon/Icon";
import Icon from "../Icon";

export interface ToggleIconButtonStyleProps
  extends Pick<IconStyleProps, "icon"> {
  /** toggle 상태 */
  active: boolean;
}

export interface ToggleIconButtonAttrProps
  extends ComponentPropsWithoutRef<typeof Toggle.Root> {
  /** toggleIconButton 값 */
  value: string;
  /** toggleIconButton 문구 */
  label: string;
  /** toggleIconButton 이벤트 */
  onToggle?: (pressed: boolean, value: string) => void;
}

export type ToggleIconButtonPropsType = ToggleIconButtonStyleProps &
  ToggleIconButtonAttrProps;

const ToggleIconButton: React.FC<ToggleIconButtonPropsType> = ({
  active,
  icon,
  value,
  label,
  onToggle,
  className,
  ...props
}) => {
  const [toggle, setToggle] = useState<boolean>(active);

  const iconName = (toggle ? `${icon}Fill` : icon) as keyof typeof icons;

  const handleToggle = (toggledValue: boolean) => {
    setToggle(toggledValue);
    if (onToggle) onToggle(toggledValue, value);
  };

  useEffect(() => {
    setToggle(active);
  }, [active]);

  return (
    <Toggle.Root
      className={classNames(
        "toggle-icon-button",
        toggle && "toggle-icon-button--active",
        className
      )}
      type="button"
      pressed={toggle}
      value={value}
      aria-label={`${label} ${toggle ? "체크됨" : ""}`}
      onPressedChange={handleToggle}
      {...props}
    >
      <Icon icon={iconName} />
    </Toggle.Root>
  );
};

export default ToggleIconButton;
