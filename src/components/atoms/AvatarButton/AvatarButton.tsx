import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Button as PrimitiveButton } from "@radix-ui/themes";

import "./_avatarButton.scss";

import Avatar, { AvatarStyleProps } from "../Avatar/Avatar";

interface AvatarButtonAttrProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 클릭 리스너 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

type AvatarButtonProps = AvatarStyleProps & AvatarButtonAttrProps;

const AvatarButton: React.FC<AvatarButtonProps> = ({
  variant,
  size = "medium",
  userName,
  path,
  className,
  onClick,
}) => {
  return (
    <PrimitiveButton
      className={classNames("avatar-button", className)}
      onClick={onClick}
    >
      <Avatar variant={variant} size={size} userName={userName} path={path} />
    </PrimitiveButton>
  );
};

export default AvatarButton;
