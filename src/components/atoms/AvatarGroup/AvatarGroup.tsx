import React from "react";
import classNames from "classnames";

import "./_avatarGroup.scss";

import Avatar, { AvatarStyleProps } from "../Avatar/Avatar";

export interface AvatarGroupProps {
  /** 아바타 배열 */
  avatars: AvatarStyleProps[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
  return (
    <div className="avatar-group">
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
