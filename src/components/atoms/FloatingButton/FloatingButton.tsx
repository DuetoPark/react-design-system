import React, { ButtonHTMLAttributes } from "react";
import IconButton from "../IconButton";
import classNames from "classnames";

import "./_floatingButton.scss";

import { IconName } from "../Icon/Icon";

interface FloatingButtonStyleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 용도 */
  label: string;
  /** 버튼 아이콘 */
  icon: IconName;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 버튼 클릭 리스너 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** PrimitiveButton의 color 값을 설정하지 않도록 명시 */
  color: never;
}

const FloatingButton: React.FC<FloatingButtonStyleProps> = ({
  label,
  icon,
  disabled,
  onClick,
  className,
  ...props
}) => {
  return (
    <IconButton
      className={classNames("floating-button", className)}
      label={label}
      icon={icon}
      variant="solid"
      size={56}
      disabled={disabled}
      {...props}
    />
  );
};

export default FloatingButton;
