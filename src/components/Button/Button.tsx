import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as PrimitiveButton } from "@radix-ui/themes";

import "./_button.scss";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 버튼 클릭 리스너 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 안의 내용 */
  children: string | ReactNode;
}

interface SolidButtonStyle extends CommonButtonProps {
  /** 버튼 종류 */
  variant?: "solid";
  /** 버튼 테마 */
  color?: "primary";
  /** 버튼 크기 */
  size?: "large" | "medium" | "small";
}

interface OutlinedButtonStyle extends CommonButtonProps {
  variant?: "outlined";
  color?: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small";
}

interface TextButtonStyle extends CommonButtonProps {
  variant?: "text";
  color?: "primary" | "assistive";
  size?: "medium" | "small";
}

type ButtonStyleProps =
  | SolidButtonStyle
  | OutlinedButtonStyle
  | TextButtonStyle;

const Button: React.FC<ButtonStyleProps> = ({
  variant = "solid",
  color = "primary",
  size = "medium",
  disabled,
  onClick,
  children,
  ...props
}) => {
  return (
    <PrimitiveButton
      className={`button button--${variant}-${color} button--${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </PrimitiveButton>
  );
};

export default Button;
