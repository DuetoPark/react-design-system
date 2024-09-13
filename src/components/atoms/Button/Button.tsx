import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as PrimitiveButton } from "@radix-ui/themes";

import "./_button.scss";

interface ButtonAttrProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 버튼 클릭 리스너 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 안의 내용 */
  children: string | ReactNode;
}

interface SolidButtonStyle {
  /** 버튼 테마 */
  color?: "primary";
  /** 버튼 크기 */
  size?: "large" | "medium" | "small";
}

interface OutlinedButtonStyle {
  /** 버튼 테마 */
  color?: "primary" | "secondary" | "assistive";
  /** 버튼 크기 */
  size?: "large" | "medium" | "small";
}

interface TextButtonStyle {
  /** 버튼 테마 */
  color?: "primary" | "assistive";
  /** 버튼 크기 */
  size?: "medium" | "small";
}

interface ButtonVariantType {
  /** 버튼 종류 */
  variant?: "solid" | "outlined" | "text";
}

// 조건부 타입
type ButtonStyleType<T extends ButtonVariantType["variant"]> = T extends "solid"
  ? SolidButtonStyle
  : T extends "outlined"
    ? OutlinedButtonStyle
    : TextButtonStyle;

// 제네릭 타입
const Button = <T extends ButtonVariantType["variant"]>({
  variant = "solid",
  color = "primary",
  size = "medium",
  disabled,
  onClick,
  children,
  ...props
}: ButtonAttrProps & ButtonStyleType<T> & { variant?: T }) => {
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
