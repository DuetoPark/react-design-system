import React from "react";
import * as PrimitiveAvatar from "@radix-ui/react-avatar";
import classNames from "classnames";

import PersonImage from "./assets/person.svg";
import CompanyImage from "./assets/company.svg";
import AcademicImage from "./assets/academic.svg";

import "./_avatar.scss";

export type AvatarVariantType = "person" | "company" | "academic";
export type AvatarSizeType = "xsmall" | "small" | "medium" | "large" | "xlarge";

export interface AvatarStyleProps {
  /** 아바타 종류 */
  variant: AvatarVariantType;
  /** 아바타 크기 */
  size?: AvatarSizeType;
  /** 사용자 이름 */
  userName: string;
  /** 아바타 이미지 경로 */
  path?: string;
  /** 아바타 클래스명 */
  className?: string;
}

const getFallbackImage = (variant: AvatarVariantType) => {
  switch (variant) {
    case "person":
      return PersonImage;
    case "company":
      return CompanyImage;
    case "academic":
      return AcademicImage;
  }
};

const Avatar: React.FC<AvatarStyleProps> = ({
  variant,
  size = "medium",
  userName,
  path,
  className,
}) => {
  return (
    <PrimitiveAvatar.Root
      className={classNames(
        "avatar-wrapper",
        `avatar-wrapper--${variant}`,
        `avatar-wrapper--${size}`,
        path && "avatar-wrapper--border",
        className
      )}
    >
      <PrimitiveAvatar.Image
        className="avatar--image"
        src={path}
        alt={`${userName}의 프로필 이미지`}
      />
      <PrimitiveAvatar.Fallback className="avatar--fallback" delayMs={600}>
        <img
          src={getFallbackImage(variant)}
          alt={`${userName}의 프로필 이미지`}
        />
      </PrimitiveAvatar.Fallback>
    </PrimitiveAvatar.Root>
  );
};

export default Avatar;
