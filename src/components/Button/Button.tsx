import React, { PropsWithChildren } from "react";
import { Button as PrimitiveButton } from "@radix-ui/themes";

import "./_button.scss";

interface ButtonStyleProps {
  variant?: "solid" | "outlined" | "text";
  color?: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small";
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonStyleProps>> = ({
  children,
  variant = "solid",
  color = "primary",
  size = "large",
  loading,
  ...props
}) => {
  return (
    <PrimitiveButton
      className={`button button--${variant}-${color} button--${size}`}
      {...props}
    >
      {children}
    </PrimitiveButton>
  );
};

export default Button;
