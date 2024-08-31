import React from "react";
import classNames from "classnames";

import "./_avatarGroup.scss";

import Avatar, { AvatarStyleProps } from "../Avatar/Avatar";

export interface AvatarGroupProps {
  /** 아바타 배열 */
  avatars: AvatarStyleProps[];
  /** 아바타 그룹 클래스명 */
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, className }) => {
  return (
    <div className={classNames("avatar-group", className)}>
      {avatars.map(({ ...avatar }) => (
        <div
          key={avatar.userName}
          className={classNames(
            "avatar-item",
            `avatar-item--${avatar.size}`,
            `avatar-item--${avatar.variant}`
          )}
        >
          <Avatar {...avatar} />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
